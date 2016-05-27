'use strict';

const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const sass = require('metalsmith-sass');
const layout = require('metalsmith-layouts');
const collections = require('metalsmith-collections');
const watch = require('metalsmith-watch');
const serve = require('metalsmith-serve');
const env = require('metalsmith-env');
// const drafts = require('metalsmith-drafts');
const permalinks = require('metalsmith-permalinks');

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
  // pattern: ':title',
  linksets: [{
    match: {
      collection: 'pages'
    },
    pattern: ':title'
  }, {
    match: {
      collection: 'posts'
    },
    pattern: ':collection/:date/:title',
    // date: 'mmddyy'
  }, {
    match: {
      collection: 'projects'
    },
    pattern: ':collection/:date/:title',
    // date: 'mmddyy'
  }]
}));

metalsmith.use(sass({
  //change sass directory name to css
  outputDir: function(originalPath) {
    return originalPath.replace('sass', 'css');
  },
  outputStyle: 'compressed'
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
      'layouts/**/*': true,
      'index.js': true
    },
    livereload: true
  }));

  metalsmith.use(serve({
    port: 8080,
    verbose: true
  }));
}

metalsmith.build(function(err) {

  if (err) {
    throw err;
  }

  console.log('build finished!');
});
