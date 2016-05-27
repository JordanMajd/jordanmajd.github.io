'use strict';

const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const sass = require('metalsmith-sass');
const layout = require('metalsmith-layouts');
const collections = require('metalsmith-collections');
const watch = require('metalsmith-watch');
const serve = require('metalsmith-serve');
const env = require('metalsmith-env');
const permalinks = require('metalsmith-permalinks');
const babel = require('metalsmith-babel');

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

metalsmith.use(env());

metalsmith.use(collections({
  layouts: {
    pattern: paths.layouts + '**/*.html'
  },
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

}

metalsmith.build(function(err) {

  if (err) {
    throw err;
  }

  console.log('build finished!');
});
