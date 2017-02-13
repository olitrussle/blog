// expanding-select.js
//
// Sets the width of the select
// to the width of the selected element.
//
// Based on:
//   http://stackoverflow.com/a/20091985

function resizeSelectToSelectedOption(select) {
  var MINIMUM_SELECT_WIDTH = 144;

  var selectedIndex = select.selectedIndex;
  var selectedOptionText = select[selectedIndex].innerHTML;
  var selectCss = select.className;

  if (selectedOptionText === "") {
    select.style.width = MINIMUM_SELECT_WIDTH + "px";
    return;
  }

  // Create a select with the same properties, but only one element.
  var widthCheckerElement = document.createElement("select");
  widthCheckerElement.className = selectCss;

  var widthCheckerOption = document.createElement("option");
  widthCheckerOption.textContent = selectedOptionText;
  widthCheckerElement.appendChild(widthCheckerOption);

  select.parentNode.insertBefore(widthCheckerElement, select);

  // Get the width!
  var optionWidth = widthCheckerElement.offsetWidth;
  if (optionWidth < MINIMUM_SELECT_WIDTH) {
    optionWidth = MINIMUM_SELECT_WIDTH;
  }

  widthCheckerElement.parentNode.removeChild(widthCheckerElement);
  select.style.width = optionWidth + "px";
};

function attachExpandingSelectHandlers() {
  var expandingSelects = document.getElementsByClassName("tsl-expanding-select");

  Array.prototype.forEach.call(expandingSelects, function(select) {

    // Firefox doesn't fire onchange when using the keyboard:
    //   https://bugzilla.mozilla.org/show_bug.cgi?id=126379
    // Here's a bugfix.
    select.onkeyup = function() { resizeSelectToSelectedOption(select); }

    select.onchange = function() { resizeSelectToSelectedOption(select); }
    select.onchange();
  });
}

document.addEventListener("DOMContentLoaded", attachExpandingSelectHandlers);
