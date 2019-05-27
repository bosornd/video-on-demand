module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Simple Video-on-Demand Application',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'http://www.bosornd.com' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: ['~/plugins/vuetify.js'],
  css: ['~/assets/style/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    extend (config, ctx) {
      if(!ctx.isDev) {
      config.output.publicPath = '/ranking/_nuxt/'
      }
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  },
  modules: ['@nuxtjs/axios', '@nuxtjs/auth'],
  axios: {
    proxy: true
  },
  proxy: {
    '/api/movies': { target: `http://${process.env.MOVIE_DB_API_SERVICE_HOST}:${process.env.MOVIE_DB_API_SERVICE_PORT}`,
                   pathRewrite: { '^/api/movies' : '/' }  },
    '/api/auth': { target: `http://${process.env.USER_DB_API_SERVICE_HOST}:${process.env.USER_DB_API_SERVICE_PORT}`,
                  pathRewrite: { '^/api/auth' : '/' }  },
    '/api/users': { target: `http://${process.env.USER_DB_API_SERVICE_HOST}:${process.env.USER_DB_API_SERVICE_PORT}`,
                  pathRewrite: { '^/api/users' : '/users' }  }
  }
}
