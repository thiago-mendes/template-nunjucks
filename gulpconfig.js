exports.dirs = {
  bower: 'bower_components',
  private: 'private',
  public: 'public'
};

exports.paths = {
  vendor: {
    stylesheets: [
      this.dirs.bower + '/slick-carousel/slick/slick.css',
    ],
    scripts: [
      this.dirs.bower + '/jquery/dist/jquery.js',
      this.dirs.bower + '/slick-carousel/slick/slick.min.js',
      this.dirs.bower + '/jquery/dist/jquery.js',
      this.dirs.bower + '/magnific-popup/dist/jquery.magnific-popup.js',
      this.dirs.bower + '/scrollreveal/dist/scrollreveal.js',
    ]
  },
  project: {
    fonts: [
      this.dirs.private + '/fonts/**',
      this.dirs.bower + '/components-font-awesome/fonts/**',
    ],
    images: [this.dirs.private + '/images/**'],
    json: [this.dirs.private + '/json/**'],
    scripts: [this.dirs.private + '/scripts/**/*.js'],
    stylesheets: [this.dirs.private + '/stylesheets/**/*.scss'],
    pages: [this.dirs.private + '/pages/**/*.nunjucks'],
    templates: [this.dirs.private + '/templates/**/*.nunjucks']
  }
};

exports.settings = {
  sass: {
    outputStyle: 'compressed',
    includePaths: [
      this.dirs.bower + '/bootstrap-sass/assets/stylesheets'
    ]
  },
  uglify: {
    preserveComments: 'license'
  },
  versionNumber: {
    value: '%MD5%',
    append: {
      key: 'v',
      to: ['css', 'js']
    }
  },
  htmlmin: {
    collapseWhitespace: true,
    removeComments: true
  },
  nunjucks: {
    path: this.dirs.private + '/templates'
  }
};
