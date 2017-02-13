// Karma configuration
// Generated on Mon Oct 03 2016 10:17:54 GMT+0100 (BST)

module.exports = function(config) {
  config.set({
    frameworks: ["jasmine"],

    files: [
      "public/js/**/*.js",
      "test/**/*.spec.js"
    ],

    reporters: ["dots"],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["PhantomJS"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
