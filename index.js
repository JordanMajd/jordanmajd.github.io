'use strict';

const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const sass = require('metalsmith-sass');

const drafts = require('metalsmith-drafts');
const permalinks = require('metalsmith-permalinks');

let paths = {
  content: 'src/',
  posts: 'src/posts/',
  projects: 'src/projects/',
  javascript: 'src/js/',
  sass: 'src/sass/',
  img: 'src/img/',
  build: 'www/'
};

Metalsmith(__dirname)
  .destination(paths.build)
  .use(markdown())
  .use(sass({
    //change sass directory name to css
    outputDir: function(originalPath){
      return originalPath.replace('sass', 'css');
    }
  }))
  .build(function(err){

    if(err){
      throw err;
    }

    console.log('build finished!');
  });
