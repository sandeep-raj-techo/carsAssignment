'use strict';

// Dependencies
const config = require('./config');
const gulp = require('gulp');
const mocha = require('gulp-mocha');


// Mocha tests task
gulp.task('test', function() {
  // Run the tests
  gulp.src(config.server.tests)
    .pipe(mocha())
    .on('error', function(err) {
      console.log(err);
    })
    .on('end', function() {
      console.log('done testing');
      mongoose.disconnect((err) => {
        if (err) { console.log(err); }
        console.log('closed connection');
        // TODO: Temp fix to exit console after running tests. 
        // Need to search for better alternative/change plugin. 
        process.exit(0);
      });
    });
});

