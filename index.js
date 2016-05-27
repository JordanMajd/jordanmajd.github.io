'use strict';

const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const sass = require('metalsmith-sass');
const layout = require('metalsmith-layouts');
const collections = require('metalsmith-collections');
// const drafts = require('metalsmith-drafts');
const permalinks = require('metalsmith-permalinks');

let paths = {};
paths.src = 'src/';

paths.javascript =  paths.src + 'js/';
paths.sass = paths.src + 'sass/';
paths.img = paths.src + 'img/';

paths.content = 'content/';
paths.posts = paths.content + 'posts/';
paths.projects = paths.content + 'projects/';

paths.build = 'www/';


Metalsmith(__dirname)
  .use(collections({
    posts:{
      pattern: paths.posts + '*.md',
      sortBy:'date'
    },
    projects:{
      pattern: paths.projects + '*.md',
      sortBy:'date'
    }
  }))
  .use(markdown())
  .use(permalinks(':collection/:date/:title'))
  .use(sass({
    //change sass directory name to css
    outputDir: function(originalPath){
      return originalPath.replace('sass', 'css');
    }
  }))
  .use(layout({
    engine: 'swig',
    partials: 'partials'
  }))

  .destination(paths.build)
  .build(function(err){

    if(err){
      throw err;
    }

    console.log('build finished!');
  });
