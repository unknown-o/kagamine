// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@/assets/scss/style.scss"],
  build: {
    // transpile 选项中可以配置需要转译的文件或模块的名称，这些文件或模块会在编译过程中被转译，以保证其兼容性。
    transpile: ["vuetify"],
  },
  extends: ['nuxt-umami'],
  appConfig: {
    umami: {
      host: 'https://analysis.llilii.cn',
      id: 'a1f454da-8122-4c78-9125-33823e28f225',
      version: 2
    },
  },
})
