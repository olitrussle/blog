"use strict";

// currency.js
// Used to power .tsl-currency inputs.
//
// Usage:
// When you include this file, it attaches
// to the window.onload event. All .tsl-currency
// elements will be augmented with JavaScript that
// ensures inputs will remain a currency.

// Converts currency strings to numeric values,
// rounded to 2 decimal places. Returns null if no numbers.
function _currencyStringToValue(value) {
  var unrounded = Number(value.replace(/[^0-9\.]+/g, ""));

  if(unrounded === "") { return null; }
  return Math.floor(unrounded * 100) / 100;
}

// Applies formatting to a potentially unformatted number
// to make it look like a currency value.
//
// Returns an object with:
// - rawValue: the value as a Number.
// - displayedValue: the formatted value to display.
function formatCurrencyInput(oldValue) {

  var rawValue = _currencyStringToValue(oldValue);

  // Replace the fanciness for display.
  var displayedValue;
  if (rawValue === null) { displayedValue = "£ "; }
  else { displayedValue = "£ " + rawValue.toLocaleString("en-GB"); }

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

  var numbersUsed = _currencyStringToValue(oldValue.substr(0, oldCaretPosition)).toString();
  if (numbersUsed === "null") { return oldCaretPosition; }
  if (oldValue[oldValue.length - 1] === ".") {
    numbersUsed += ".";
  }

  // "123" => /1[^2]*2[^3]*3/
  var searchRegex = new RegExp(Array.prototype.reduce.call(numbersUsed, function(memo, item) {
    if (!memo) { return item; }
    if (item === ".") { item = "\\."; }
    return memo + "[^" + item + "]*" + item;
  }));

  var match = searchRegex.exec(newValue);
  if (!match) { return newValue.length; }
  else { return match.index + match[0].length; }
}

// Attaches an oninput handler to each .tsl-currency class
// to ensure valid formatting.
function attachCurrencyHandlers() {
  var currencyInputs = document.getElementsByClassName("tsl-currency");

  Array.prototype.forEach.call(currencyInputs, function(input) {

    input.oninput = function onCurrencyInput(event) {
      var oldValue = input.value;
      var oldCaretPosition = input.selectionStart;

      var newValues = formatCurrencyInput(oldValue);
      input.rawValue = newValues.rawValue;
      input.value = newValues.displayedValue;

      var newCaretPosition = getNewCaretPosition(oldValue, input.value, oldCaretPosition);
      input.selectionStart = newCaretPosition;
      input.selectionEnd = newCaretPosition;
    }

    // Make sure the input is valid immediately.
    input.oninput();
  });
}

document.addEventListener("DOMContentLoaded", attachCurrencyHandlers);
