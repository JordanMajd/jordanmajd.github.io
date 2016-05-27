'use strict';

const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const babel = require('metalsmith-babel');
const sass = require('metalsmith-sass');
const layout = require('metalsmith-layouts');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const metadata = require('metalsmith-metadata');
const env = require('metalsmith-env');

// development imports
const watch = require('metalsmith-watch');
const serve = require('metalsmith-serve');

// production imports
const siteMap = require('metalsmith-mapsite');
const uglify = require('metalsmith-uglify');
const htmlMinifier = require('metalsmith-html-minifier');

//TODO
// const wordcount = require("metalsmith-word-count");
// const uncss = require('metalsmith-uncss');
// const eslint = require('metalsmith-eslint');
// const pagination = require('metalsmith-pagination');
// const branch = require('metalsmith-branch');
// const drafts = require('metalsmith-drafts');


let paths = {};
paths.src = 'src/';

paths.javascript = paths.src + 'js/';
paths.sass = paths.src + 'sass/';
paths.img = paths.src + 'img/';

paths.content = 'content/';
paths.pages = paths.content + 'pages/';
paths.posts = paths.content + 'posts/';
paths.projects = paths.content + 'projects/';

paths.layouts = 'layouts/';
paths.partials = 'partials/';

paths.build = 'www/';

let metalsmith = Metalsmith(__dirname);

metalsmith.source(paths.src);

metalsmith.use(metadata({
  config: 'config.json'
}));

metalsmith.use(env());

metalsmith.use(collections({
  pages: {
    pattern: paths.pages + '*.md',
  },
  posts: {
    pattern: paths.posts + '*.md',
    sortBy: 'date'
  },
  projects: {
    pattern: paths.projects + '*.md',
    sortBy: 'date'
  }
}));

metalsmith.use(markdown());

metalsmith.use(permalinks({
  linksets: [{
    match: {
      collection: 'layouts'
    },
    permalink: false
  }, {
    match: {
      collection: 'pages'
    },
    pattern: ':title'
  }, {
    match: {
      collection: 'posts'
    },
    pattern: ':collection/:date/:title'
  }, {
    match: {
      collection: 'projects'
    },
    pattern: ':collection/:date/:title'
  }]
}));

metalsmith.use(babel({
  presets: ['es2015']
}));

metalsmith.use(sass({
  //change sass directory name to css
  outputDir: function(originalPath) {
    return originalPath.replace('sass', 'css');
  },
  outputStyle: process.env.NODE_ENV !== 'production' ? 'expanded' : 'compressed'
}));

metalsmith.use(layout({
  engine: 'swig',
  directory: paths.layouts,
  partials: paths.partials
}));

metalsmith.destination(paths.build);


if (process.env.NODE_ENV !== 'production') {

  metalsmith.use(watch({
    paths: {
      'src/**/*': true,
      'layouts/**/*': '**/*',
      'index.js': '**/*'
    },
    livereload: true
  }));

  metalsmith.use(serve({
    port: 8080,
    verbose: true
  }));
} else {

  metalsmith.use(uglify());
  metalsmith.use(htmlMinifier());

  metalsmith.use(siteMap({
    hostname: 'http://jordanmajd.com'
  }));
}

metalsmith.build(function(err) {

  if (err) {
    throw err;
  }
  console.log(metalsmith.metadata());

  console.log('build finished!');
});
