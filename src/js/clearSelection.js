// http://upshots.org/javascript/javascript-cross-browser-clear-selection

export default function clearSelection() {
  let selection;
  if (window.getSelection) selection = window.getSelection();
  else if (document.selection) selection = document.selection;

  if (selection) {
    if (selection.empty) selection.empty();
    if (selection.removeAllRanges) selection.removeAllRanges();
  }
}
