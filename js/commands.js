export function detectCommand(text) {
  const t = text.toLowerCase();

  if (t.includes("post")) return "POST";
  if (t.includes("clear note")) return "CLEAR";
  if (t.includes("undo")) return "UNDO";
  if (t.includes("redo")) return "REDO";
  if (t.includes("delete note")) return "DELETE";
  if (t.includes("select all")) return "SELECT_ALL";
  if (t.includes("copy")) return "COPY";
  if (t.includes("paste")) return "PASTE";
  if (t.includes("next point")) return "NEXT_POINT";

  return null;
}
