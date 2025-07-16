const editor = document.getElementById("editor");

editor.addEventListener("keydown", function (e) {
  if (e.key === "Tab") {
    e.preventDefault();
    insertTextAtCursor("  ");
  } else if (e.key === "Enter" && e.shiftKey) {
    e.preventDefault();
    openPreviewTab();
  } else if (e.key === "Enter") {
    e.preventDefault();
    insertTextAtCursor("\n" + getIndentationBeforeCursor());
  }

  // Delay to allow content update before highlighting
  setTimeout(() => Prism.highlightElement(editor), 0);
});

function insertTextAtCursor(text) {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;
  const range = selection.getRangeAt(0);
  range.deleteContents();
  const textNode = document.createTextNode(text);
  range.insertNode(textNode);
  range.setStartAfter(textNode);
  range.setEndAfter(textNode);
  selection.removeAllRanges();
  selection.addRange(range);
}

function getIndentationBeforeCursor() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return "";
  const range = selection.getRangeAt(0);
  const container = range.startContainer;
  if (!container.textContent) return "";

  const textBeforeCursor = container.textContent.slice(0, range.startOffset);
  const match = textBeforeCursor.match(/^\s*/);
  return match ? match[0] : "";
}

function openPreviewTab() {
  const code = editor.innerText;
  const previewWindow = window.open("", "_blank");
  previewWindow.document.open();
  previewWindow.document.write(`<html><head></head><body>${code}</body></html>`);
  previewWindow.document.close();
}
