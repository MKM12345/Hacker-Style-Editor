
function handleKeyDown(event) {
  const codeArea = document.getElementById("code-area");
  
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    document.execCommand("insertText", false, "\n");
  } else if (event.key === "Enter" && event.shiftKey) {
    event.preventDefault();
    showResult();
  }
}

function showResult() {
  var code = document.getElementById("code-area").innerText;
  var resultWindow = window.open("", "_blank");
  resultWindow.document.open();
  resultWindow.document.write("<html><head></head><body>" + code + "</body></html>");
  resultWindow.document.close();
}
