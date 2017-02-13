"use strict";

// currency.js
// Used to power .tsl-currency inputs.
//
// Usage:
// When you include this file, it attaches
// to the window.onload event. All .tsl-currency
// elements will be augmented with JavaScript that
// ensures inputs will remain a currency.

var PREFIX = "£ ";

// Converts currency strings to numeric values,
// rounded to 2 decimal places. Returns null if no numbers.
function _currencyStringToValue(value) {
  var stripped = value.replace(/[^0-9\.]+/g, "");
  if(stripped === "") { return null; }

  var unrounded = Number(value.replace(/[^0-9\.]+/g, ""));
  return Math.floor(unrounded * 100) / 100;
}

// Applies formatting to a potentially unformatted number
// to make it look like a currency value.
//
// Returns an object with:
// - rawValue: the value as a Number.
// - displayedValue: the formatted value to display.
//
// Returns "£ " and null when no value has been entered.
function formatCurrencyInput(oldValue) {

  var rawValue = _currencyStringToValue(oldValue);

  // Replace the fanciness for display.
  var displayedValue;
  if (rawValue === null) { displayedValue = PREFIX; }
  else { displayedValue = PREFIX + rawValue.toLocaleString("en-GB"); }

  // If the last character is a dot, it will be stripped in the number conversion. Let's re-add it!
  if (oldValue[oldValue.length - 1] === ".") {
    displayedValue += ".";
  }

  return {
    rawValue: rawValue,
    displayedValue: displayedValue
  };
}

// Ensure the caret is in the same position it was.
function getNewCaretPosition(oldValue, newValue, oldCaretPosition) {
  // This is confusing because of the addition of currency symbols
  // and commas.
  //
  // Here's how to do it - get the numbers before the caret, then
  // put the caret just after that last number.
  // (when deleting, however, it's the other way round!)

  if (oldValue === newValue) { return oldCaretPosition; }

  if (oldValue.length <= newValue.length) {

    // Addition
    var beforeCaret = _currencyStringToValue(oldValue.substr(0, oldCaretPosition));

    // If there are no numbers before the caret, we've deleted everything!
    if (beforeCaret == null) { return PREFIX.length; }

    // Make sure we keep our .
    var beforeCaretString = beforeCaret.toString();
    if (oldValue[oldValue.length - 1] === ".") {
      beforeCaretString += ".";
    }

    // "123" => /1,?2,?3/
    var searchRegex = new RegExp(beforeCaretString.split('').join(',?'));

    var match = searchRegex.exec(newValue);
    if (!match) { return oldCaretPosition - 1; }
    else { return match.index + match[0].length; }

  } else {

    // Deletion
    var afterCaret = _currencyStringToValue(oldValue.substr(oldCaretPosition));
    if (afterCaret == null) { return newValue.length; }
    var afterCaretString = afterCaret.toString();

    // "123" => /.(?=(1,?2,?3))/ (positive lookahead)
    var searchRegex = new RegExp('.(?=' + afterCaretString.split('').join(',?') + ')');

    var match = searchRegex.exec(newValue);
    if (!match) { return oldCaretPosition - 1; }
    else { return match.index + match[0].length; }
  }

}

// Attaches an oninput handler to each .tsl-currency class
// to ensure valid formatting.
function attachCurrencyHandlers() {
  var currencyInputs = document.getElementsByClassName("tsl-currency");

  Array.prototype.forEach.call(currencyInputs, function(input) {

    input.oninput = function onCurrencyInput(event) {
      var dirtyValue = input.value;
      var dirtyCaretPosition = input.selectionStart;

      var cleanValues = formatCurrencyInput(dirtyValue);
      input.rawValue = cleanValues.rawValue;
      input.value = cleanValues.displayedValue;

      if (input === document.activeElement) {
        var newCaretPosition = getNewCaretPosition(dirtyValue, cleanValues.displayedValue, dirtyCaretPosition);

        // Chrome for Android does something weird
        // when an oninput event changes the value of
        // an input. However, within a glorious setTimeout,
        // all is well with the world.
        //
        // I hate myself.
        setTimeout(function() {
          input.selectionStart = newCaretPosition;
          input.selectionEnd = newCaretPosition;
        }, 1);

      }
    }

    // Make sure the input is valid immediately.
    input.oninput();
  });
}

document.addEventListener("DOMContentLoaded", attachCurrencyHandlers);
