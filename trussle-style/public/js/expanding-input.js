// expanding-input.js
//
// Sets the width of the input
// to the width of the text within it.
//
// Based on:
//   http://stackoverflow.com/a/20091985

function resizeInputToText(input) {
  var MINIMUM_INPUT_WIDTH = 144;

  var inputText = input.value;
  var inputCss = input.className;

  if (inputText === "") {
    input.style.width = MINIMUM_INPUT_WIDTH + "px";
    return;
  }

  // Create a span with the same properties as the input.
  var widthCheckerElement = document.createElement("span");
  widthCheckerElement.className = inputCss;
  widthCheckerElement.style.display = "inline-block";
  widthCheckerElement.innerHTML = inputText.replace(/ /g, "&nbsp;");

  input.parentNode.insertBefore(widthCheckerElement, input);

  // Get the width!
  var textWidth = widthCheckerElement.offsetWidth;
  if (textWidth < MINIMUM_INPUT_WIDTH) {
    textWidth = MINIMUM_INPUT_WIDTH;
  }

  widthCheckerElement.parentNode.removeChild(widthCheckerElement);
  input.style.width = textWidth + "px";
};

function attachExpandingInputHandlers() {
  var expandingInputs = document.getElementsByClassName("tsl-expanding-input");

  Array.prototype.forEach.call(expandingInputs, function(input) {
    input.oninput = function() { resizeInputToText(input); }
    resizeInputToText(input);
  });
}

document.addEventListener("DOMContentLoaded", attachExpandingInputHandlers);
