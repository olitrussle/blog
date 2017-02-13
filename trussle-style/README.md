# Trussle Style: Elements and Style Guide

![Style](http://i.imgur.com/PonFKki.jpg)

This repository contains some fabulous things to make your project super-stylish:

- `trussle-style.css`: A CSS file with classes that together make up the Trussle front-end style.
- `js`: Some JavaScript files used in collaboration with the CSS classes for bonus functionality (e.g. currency input validation).
- Style Guide: A website that demonstrates each element to show what they're made of.

## Using Trussle Style

To get Trussle styles into your project, install this package:

```
npm install trussle-style
```

This will add the style to your `node_modules` directory.

Next, set up a symlink to the styles in your `public` folder (or wherever you keep assets):

```
ln -s ../node_modules/trussle-style/public public/trussle-style
```

Now you can refer to the style files:

- The CSS is at `./node_modules/trussle-style/public/trussle-style.css`.
- Javascript files are at `./node_modules/trussle-style/public/js/*.js`.

If you're SASSy, we also include the individual SASS files for you to include in the directory `./node_modules/trussle-style/scss`.

## Viewing the Style Guide

To view the style guide, clone this repository and then `npm start`.

## Creating New Styles

Enter development mode with `npm run watch`. This will auto-build any changes to SASS or Pug files and run the JavaScript tests.

Note that the `js` directory contains files intended to be run in the browser, so they're **ES5**.
