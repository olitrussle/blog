// Tests of currency.js

describe("currency.js", function() {

  describe("formatCurrencyInput", function() {

    it("always displays a pound sign and space", function() {
      expect(formatCurrencyInput("").displayedValue).toEqual("£ ");
      expect(formatCurrencyInput("0").displayedValue).toEqual("£ 0");
      expect(formatCurrencyInput("1").displayedValue).toEqual("£ 1");
      expect(formatCurrencyInput("£0").displayedValue).toEqual("£ 0");
      expect(formatCurrencyInput("£ 0").displayedValue).toEqual("£ 0");
    });

    it("displays a trailing decimal point", function() {
      expect(formatCurrencyInput("£ 0").displayedValue).toEqual("£ 0");
      expect(formatCurrencyInput("£ 0.").displayedValue).toEqual("£ 0.");
      expect(formatCurrencyInput("£ 1.").displayedValue).toEqual("£ 1.");
    });

    it("adds a leading zero for decimal points", function() {
      expect(formatCurrencyInput("£ 0.").displayedValue).toEqual("£ 0.");
      expect(formatCurrencyInput("£ .1").displayedValue).toEqual("£ 0.1");
      expect(formatCurrencyInput("£ 0.1").displayedValue).toEqual("£ 0.1");
    });

    it("ignores extra decimal points", function() {
      expect(formatCurrencyInput("£ 0.12").displayedValue).toEqual("£ 0.12");
      expect(formatCurrencyInput("£ 0.123").displayedValue).toEqual("£ 0.12");
      expect(formatCurrencyInput("£ 0.129").displayedValue).toEqual("£ 0.12");
    });

    // FIXME: Currently PhantomJS does not correctly do .toLocaleString()
    // correctly, and won't until WebKit fixes it:
    //   https://github.com/ariya/phantomjs/issues/12581
    //
    // it("adds thousands separators", function() {
    //   expect(formatCurrencyInput("£ 123").displayedValue).toEqual("£ 123");
    //   expect(formatCurrencyInput("£ 1234").displayedValue).toEqual("£ 1,234");
    //   expect(formatCurrencyInput("£ 1,234").displayedValue).toEqual("£ 1,234");
    //   expect(formatCurrencyInput("£ 123,4").displayedValue).toEqual("£ 1,234");
    //   expect(formatCurrencyInput("£ 123456").displayedValue).toEqual("£ 123,456");
    //   expect(formatCurrencyInput("£ 1234567").displayedValue).toEqual("£ 1,234,567");
    //   expect(formatCurrencyInput("£ 1234567.89").displayedValue).toEqual("£ 1,234,567.89");
    // });

    it("correctly extracts the raw value from a formatted string", function() {
      expect(formatCurrencyInput("£ 0").rawValue).toEqual(0);
      expect(formatCurrencyInput("£ 0.12").rawValue).toEqual(0.12);
      expect(formatCurrencyInput("£ 123,456").rawValue).toEqual(123456);
    });

  });

  describe("getNewCaretPosition", function() {

    // Expectation generator
    function expectCaretToMove(from, to) {
      it("moves caret from \"" + from + "\" to \"" + to + "\"", function() {
        var oldCaretPosition = from.indexOf("|");
        var oldValue = from.replace("|", "");

        var newCaretPosition = to.indexOf("|");
        var newValue = to.replace("|", "");

        var result = getNewCaretPosition(oldValue, newValue, oldCaretPosition);
        expect(result).toEqual(newCaretPosition);
      });
    }

    function expectCaretToStay(value) {
      it("keeps caret in place when value is \"" + value + "\"", function() {
        var caretPosition = value.indexOf("|");

        var result = getNewCaretPosition(value, value, caretPosition);
        expect(result).toEqual(caretPosition);
      });
    }

    describe("when typing at the end", function() {
      expectCaretToMove("|", "£ |");
      expectCaretToMove("0|", "£ 0|");
      expectCaretToMove("£ 0|", "£ 0|");
      expectCaretToMove("£ 1234|", "£ 1,234|");
      expectCaretToMove("1234|", "£ 1,234|");
      expectCaretToMove("1234.|", "£ 1,234.|");
      expectCaretToMove("1234.5|", "£ 1,234.5|");
    });

    describe("when typing", function() {
      expectCaretToMove("£ 1|234", "£ 1|,234");
      expectCaretToMove("£ 1,2|34", "£ 1,2|34");
      expectCaretToMove("£ 1,234.5|6", "£ 1,234.5|6");
      expectCaretToMove("£ 1|,234.56", "£ 1|,234.56");
      expectCaretToMove(".1|", "£ 0.1|");
    });

    describe("when called with a correctly-formatted value", function() {
      expectCaretToStay("|£ ");
      expectCaretToStay("£| ");
      expectCaretToStay("£ |");

      expectCaretToStay("£ |0");
      expectCaretToStay("£ 0|");

      expectCaretToStay("£ 456|");
      expectCaretToStay("£ 45|6");
      expectCaretToStay("£ 4|56");
      expectCaretToStay("£ |456");
      expectCaretToStay("£| 456");
      expectCaretToStay("|£ 456");

      expectCaretToStay("£ 1,234.56|");
      expectCaretToStay("£ 1,234.5|6");
      expectCaretToStay("£ 1,234.|56");
      expectCaretToStay("£ 1,234|.56");
      expectCaretToStay("£ 1,23|4.56");
      expectCaretToStay("£ 1,2|34.56");
      expectCaretToStay("£ 1,|234.56");
      expectCaretToStay("£ 1|,234.56");
      expectCaretToStay("£ |1,234.56");
      expectCaretToStay("£| 1,234.56");
      expectCaretToStay("|£ 1,234.56");
    });

    describe("when deleting", function() {
      expectCaretToMove("£|123", "£ |123");
      expectCaretToMove("£ |,234", "£ |234");
      expectCaretToMove("£ |,234,567", "£ |234,567");
      expectCaretToMove("£ 123,|56,789", "£ 12,3|56,789");
    });

  });

});
