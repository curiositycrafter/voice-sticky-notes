const KEY = "voice_note_folders";

export function loadFolders() {
  return JSON.parse(localStorage.getItem(KEY) || '["General"]');
}

export function saveFolders(folders) {
  localStorage.setItem(KEY, JSON.stringify(folders));
}

export function addFolder(name) {
  const folders = loadFolders();
  if (!folders.includes(name)) {
    folders.push(name);
    saveFolders(folders);
  }
  return folders;
}
