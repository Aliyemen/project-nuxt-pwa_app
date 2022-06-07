import colors from 'vuetify/es5/util/colors'

export default {
  ssr: true,
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - project-nuxt-pwa',
    title: 'project-nuxt-pwa',
    htmlAttrs: {
      lang: 'pt-BR'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'usuários github' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/main.css",],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      { path: '~/components/users', extensions: ['vue'] },
      { path: '~/components/common', extensions: ['vue'] },
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],
  
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.VUE_APP_API_URL
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta:[
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'usuários github' },
      { name: 'format-detection', content: 'telephone=no' },

    ],
    icon: [
      {
        src: "icon.png",
        sizes: "196x196",
        type: "image/png",
        purpose: 'maskable'
      },

    ],
    theme_color: '#f2f5f7',
    manifest: {
      name: `app${ new Date().toLocaleDateString('pt-BR', {timeZone: 'UTC'})}`,
      short_name:'app-1',
      lang: 'en',
      display: 'standalone',
      useWebmanifestExtension: true,
      cachingExtensions: '@/plugins/workbox-sync.js',
      enabled: true
    },
    worbox:{
      offlinePage : '/offline.html'

    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    extend: function (config, {isDev, isClient}) {
      config.node = {
          fs: "empty"
      };
      config.devtool = 'source-map'
    },
  },
  generate: {
    fallback: true,
  },
}
