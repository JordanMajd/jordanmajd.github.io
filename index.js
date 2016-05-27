'use strict';

require('dotenv').config();

const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const sass = require('metalsmith-sass');
const layout = require('metalsmith-layouts');
const collections = require('metalsmith-collections');
const watch = require('metalsmith-watch');
const env = require('metalsmith-env');
// const drafts = require('metalsmith-drafts');
const permalinks = require('metalsmith-permalinks');

let paths = {};
paths.src = 'src/';

paths.javascript =  paths.src + 'js/';
paths.sass = paths.src + 'sass/';
paths.img = paths.src + 'img/';

paths.content = 'content/';
paths.pages = paths.content + 'pages/';
paths.posts = paths.content + 'posts/';
paths.projects = paths.content + 'projects/';

paths.layouts = 'layouts/';
paths.partials = 'partials/';

paths.build = 'www/';


Metalsmith(__dirname)
  .source(paths.src)
  .use(env())
  .use(collections({
    pages:{
      pattern: paths.pages + '*.md',
    },
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
  // .use(permalinks(':collection/:date/:title'))
  .use(permalinks({
    // pattern: ':title',
    linksets: [
      {
        match: { collection: 'pages' },
        pattern: ':title'
      },
      {
        match: { collection: 'posts' },
        pattern: ':collection/:date/:title',
        // date: 'mmddyy'
      },
      {
        match: { collection: 'projects' },
        pattern: ':collection/:date/:title',
        // date: 'mmddyy'
      }
    ]
  }))
  .use(sass({
    //change sass directory name to css
    outputDir: function(originalPath){
      return originalPath.replace('sass', 'css');
    },
    outputStyle: 'compressed'
  }))
  .use(layout({
    engine: 'swig',
    directory: paths.layouts,
    partials: paths.partials
  }))
  .destination(paths.build)
  .use(function(){
    if(process.env.NODE_ENV !== 'production'){
      return watch({
        paths: {
          'src/**/*': true,
          'layouts/**/*': true
        },
        livereload: true
      });
    }
  })
  .build(function(err){

    if(err){
      throw err;
    }

    console.log('build finished!');
  });
