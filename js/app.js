import { initSpeech, startRecording, stopRecording } from "./speech.js";
import { detectCommand } from "./commands.js";
import { saveNotes, loadNotes } from "./storage.js";
import { loadFolders, addFolder } from "./folders.js";

const noteBox = document.getElementById("note-text");
const notesWall = document.getElementById("notes-wall");
const folderSelect = document.getElementById("folderSelect");
const searchBox = document.getElementById("searchBox");

let currentText = "";
let notes = [];
let folders = [];
let undoStack = [];
let redoStack = [];
let selectedNoteId = null;

/* Init */
initFolders();
initSpeech(handleSpeech);
loadFromStorage();

document.getElementById("recordBtn").onclick = () => {
  startRecording();   // MUST be directly inside click handler
};

document.getElementById("stopBtn").onclick = stopRecording;
document.getElementById("clearBtn").onclick = clearNote;
document.getElementById("newFolderBtn").onclick = createFolder;

/* Speech */

function normalize(text) {
  const fixes = {
    "post it": "post",
    "clear node": "clear note",
    "node": "note",
    "nope": "note"
  };

  let t = text.toLowerCase();
  for (const k in fixes) t = t.replaceAll(k, fixes[k]);
  return t;
}

function handleSpeech(text, isFinal) {
  if (!isFinal) {
    noteBox.textContent = currentText + text;
    return;
  }

  const cmd = detectCommand(normalize(text));
  if (cmd) return runCommand(cmd);

  undoStack.push(currentText);
  currentText += text + " ";
  noteBox.textContent = currentText;
}

/* Commands */

function runCommand(cmd) {
  const map = {
    POST: postNote,
    CLEAR: clearNote,
    UNDO: undo,
    REDO: redo,
    DELETE: deleteSelected,
    SELECT_ALL: selectAllText,
    COPY: copyText,
    PASTE: pasteText,
    NEXT_POINT: nextBullet
  };
  map[cmd]?.();
}

/* Editor */

function selectAllText() {
  const r = document.createRange();
  r.selectNodeContents(noteBox);
  const s = window.getSelection();
  s.removeAllRanges();
  s.addRange(r);
}

function copyText() {
  navigator.clipboard?.writeText(currentText);
}

async function pasteText() {
  if (!navigator.clipboard) return;
  const t = await navigator.clipboard.readText();
  currentText += t + " ";
  noteBox.textContent = currentText;
}

function undo() {
  if (!undoStack.length) return;
  redoStack.push(currentText);
  currentText = undoStack.pop();
  noteBox.textContent = currentText;
}

function redo() {
  if (!redoStack.length) return;
  undoStack.push(currentText);
  currentText = redoStack.pop();
  noteBox.textContent = currentText;
}

function clearNote() {
  currentText = "";
  noteBox.textContent = "";
}

/* Notes */

function autoFormatBullets(text) {
  const parts = text.split(/\.|\n/).map(s => s.trim()).filter(Boolean);
  if (parts.length <= 1) return text;
  return parts.map(p => `• ${p}`).join("\n");
}

function postNote() {
  if (!currentText.trim()) return;

  const note = {
    id: Date.now(),
    text: autoFormatBullets(currentText.trim()),
    folder: folderSelect.value
  };

  notes.push(note);
  saveNotes(notes);
  clearNote();
  renderAllNotes();
}

function deleteSelected() {
  if (!selectedNoteId) return;
  notes = notes.filter(n => n.id !== selectedNoteId);
  saveNotes(notes);
  renderAllNotes();
}

/* Rendering */

function renderSticky(note) {
  const el = document.createElement("div");
  el.className = "sticky-note";
  el.dataset.id = note.id;
  el.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;

  el.innerHTML = `
    <button class="sticky-delete">×</button>
    <div>${note.text}</div>
  `;

  el.onclick = () => {
    document.querySelectorAll(".sticky-note").forEach(n => n.classList.remove("selected"));
    el.classList.add("selected");
    selectedNoteId = note.id;
    el.classList.toggle("expanded");
  };

  el.querySelector(".sticky-delete").onclick = e => {
    e.stopPropagation();
    selectedNoteId = note.id;
    deleteSelected();
  };

  el.draggable = true;
  el.ondragstart = e => e.dataTransfer.setData("id", note.id);

  notesWall.prepend(el);
}

function renderAllNotes() {
  notesWall.innerHTML = "";
  const f = folderSelect.value;
  notes.filter(n => n.folder === f).forEach(renderSticky);
}

/* Drag & drop */

notesWall.ondragover = e => e.preventDefault();
notesWall.ondrop = e => {
  const id = e.dataTransfer.getData("id");
  const el = document.querySelector(`[data-id="${id}"]`);
  if (el) notesWall.prepend(el);
};

/* Storage */

function loadFromStorage() {
  notes = loadNotes();
  renderAllNotes();
}

/* Search */

searchBox.oninput = e => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll(".sticky-note").forEach(n => {
    n.style.display = n.innerText.toLowerCase().includes(q) ? "block" : "none";
  });
};

/* Folders */

function initFolders() {
  folders = loadFolders();
  folderSelect.innerHTML = "";
  folders.forEach(f => {
    const o = document.createElement("option");
    o.value = f;
    o.textContent = f;
    folderSelect.appendChild(o);
  });
}

folderSelect.onchange = renderAllNotes;

function createFolder() {
  const name = prompt("Folder name?");
  if (!name) return;
  folders = addFolder(name);
  initFolders();
  folderSelect.value = name;
  renderAllNotes();
}

/* Keyboard shortcuts */

document.addEventListener("keydown", async e => {
  if (!e.ctrlKey) return;

  const k = e.key.toLowerCase();
  e.preventDefault();

  if (k === "z") undo();
  if (k === "s") postNote();
  if (k === "c") copyText();
  if (k === "v") await pasteText();
});

/* Bullet voice */

function nextBullet() {
  if (!currentText.trim()) currentText = "• ";
  else if (!currentText.endsWith("\n")) currentText += "\n• ";
  else currentText += "• ";

  noteBox.textContent = currentText;
}
