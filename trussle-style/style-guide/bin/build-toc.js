"use strict";

const fs = require("fs");

// build-toc.js
//
// Build an HTML table of contents from a compiled
// HTML file, based on the headers.

const INPUT_FILE = "index.html";
const OUTPUT_FILE = "style-guide/table-of-contents.html";

// Finds headers and their contents.
//
// Match 1: The header type (e.g. "h1")
// Match 2: The ID to use for this element (e.g. "hello-world")
// Match 2: The header contents (e.g. "Hello, world!")
//
// Note that this regex has AT LEAST the following limitations:
// - Tags within headers won't work: <h1>Hello <span>World</span></h1>
// - No < in the header! <h1>Me < You</h1>
const headerFinder = /<h([1-6]) id="([^\"]*)">([^<]*)<\/h[1-6]>/g;

console.log(`Regenerating Table of Contents\n  at ${OUTPUT_FILE}\n  using ${INPUT_FILE}`);

// Strategy:
// 1. Run the regex over the input file to get the headers.
// 2. Create a tree of headers from the parsed headers.
// 3. Write the table of contents to the file.
fs.readFile(INPUT_FILE, { encoding: "utf-8" }, (err, data) => {

  const headerList = [];
  while(true) {
    const matches = headerFinder.exec(data);
    if (!matches) break;

    headerList.push({
      headerNumber: Number(matches[1]),
      headerId: matches[2],
      headerText: matches[3]
    });
  }

  let html = headerList.reduce((memo, item, index) => {
    const currentHeaderNumber = item.headerNumber;

    const nextHeader = headerList[index + 1];
    const nextHeaderNumber = nextHeader ? nextHeader.headerNumber : 0;

    memo.html += `<li><a href="#${item.headerId}">${item.headerText}</a>`;

    if (nextHeaderNumber > currentHeaderNumber) {
      memo.html += "<ul>";
    }
    else if (nextHeaderNumber < currentHeaderNumber) {
      memo.html += "</li></ul>";
    }
    else {
      memo.html += "</li>";
    }

    return memo;
  }, {
    html: ""
  }).html + "";

  html = `<!--\n\
  This is an auto-generated file.\n\
  To generate this file, run \`npm run build-toc\`.\n\
  To get your headers on the Table of Contents, make sure they:\n\
  1. are an <hx> element.\n\
  2. have an ID.\n\
-->\n\n<ul>${html}</ul>`;

  fs.writeFile(OUTPUT_FILE, html, (err) => {
    if (err) { console.log(err); }
    else {
      console.log("Done!");
    }
  });
});
