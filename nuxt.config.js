const {join} = require('path')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'treasure-hunt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'App created for BringIT event - Garmin Cluj' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: ['~plugins/vuetify.js'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['vuetify'],
  },
  css: [
      {
          src: join(__dirname, 'assets/css/app.styl'),
          lang: 'styl'
      }
  ],
  serverMiddleware: [
    // Will register file from project api directory to handle /api/* requires
    '~api/index.js',
  ]
}
