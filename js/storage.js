export function saveNotes(notes) {
  localStorage.setItem("voice_notes", JSON.stringify(notes));
}

export function loadNotes() {
  return JSON.parse(localStorage.getItem("voice_notes") || "[]");
}
