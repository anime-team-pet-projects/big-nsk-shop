// https://nuxt.com/docs/api/configuration/nuxt-config
import StyleLintPlugin from 'vite-plugin-stylelint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { fileURLToPath } from 'url'

const styleLintConfig = StyleLintPlugin({
  files: ['src/**/*.{vue,scss}'],
  fix: true,
})

const autoImportConfig = AutoImport({
  resolvers: [ElementPlusResolver()],
})

const componentsConfig = Components({
  // TODO: Тема с автоимпортом не нужных файлов, вроде как решена, нужно понаблюдать
  globs: ['./src/shared/ui/**/*', './src/features/ui/**/*', './src/entities/ui/**/*', './src/widgets/**/ui/**/*'],
  deep: false,
  // include: [/\.vue$/, /\.vue\?vue/],
  exclude: [
    /[\\/]node_modules[\\/]/,
    /[\\/]\.git[\\/]/,
    /[\\/]\.nuxt[\\/]/,
    './src/shared/ui/**/components/*',
    './src/features/ui/**/components/*',
    './src/entities/ui/**/components/*',
    './src/widgets/ui/**/components/*',
  ],
  // directives: true,
  resolvers: [ElementPlusResolver()],
})

const svgIconsConfig = createSvgIconsPlugin({
  iconDirs: [path.resolve(process.cwd(), 'assets/icons')],
  symbolId: 'icon-[dir]-[name]',
  inject: 'body-first',
  customDomId: '__svg__icons__dom__',
})

export default defineNuxtConfig({
  alias: {
    '~~': fileURLToPath(new URL('./', import.meta.url)),
    '@@': fileURLToPath(new URL('./', import.meta.url)),
    '~': fileURLToPath(new URL('./src', import.meta.url)),
    '@': fileURLToPath(new URL('./src', import.meta.url)),
    assets: fileURLToPath(new URL('./assets', import.meta.url)),
    public: fileURLToPath(new URL('./public', import.meta.url)),
    shared: fileURLToPath(new URL('./src/shared', import.meta.url)),
    entities: fileURLToPath(new URL('./src/entities', import.meta.url)),
    features: fileURLToPath(new URL('./src/features', import.meta.url)),
    widgets: fileURLToPath(new URL('./src/widgets', import.meta.url)),
    styles: fileURLToPath(new URL('./assets/styles', import.meta.url)),
    fonts: fileURLToPath(new URL('./assets/fonts', import.meta.url)),
  },
  dir: {
    plugins: './src/app/plugins',
    layouts: './src/app/layouts',
    middleware: './src/app/middleware',
    pages: './src/pages',
  },
  imports: {
    dirs: ['./src/app/composables', './src/app/utils'],
  },
  components: [
    {
      path: '@/app/ui',
      global: true,
      pathPrefix: false,
    },
    {
      path: '@/shared/ui',
      global: false,
      pathPrefix: false,
      // TODO: Нужно избавиться от варнингов нукста на тему дублирования имён компонентов в консоле IDE
      // ниже варианты не работают
      // ignore: [
      //   './src/shared/ui/**/components/**/*.{vue}',
      //   './src/shared/ui/**/components/**/*',
      //   './src/shared/ui/**/components/**/',
      //   './src/shared/ui/**/components/**',
      //   './src/shared/ui/**/components/*.{vue}',
      //   './src/shared/ui/**/components/',
      //   './src/shared/ui/**/components',
      // ],
      // enabled: false,
    },
    {
      path: '@/entities/ui',
      global: false,
      pathPrefix: false,
    },
    {
      path: '@/features/ui',
      global: false,
      pathPrefix: false,
    },
    {
      path: '@/widgets/**/ui',
      global: false,
      pathPrefix: false,
    },
  ],
  modules: ['@element-plus/nuxt', '@nuxtjs/eslint-module'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "styles/additionals/variables/index.scss" as *;
            @use "styles/additionals/mixins/index.scss" as *;
          `,
        },
      },
    },
    plugins: [autoImportConfig, componentsConfig, styleLintConfig, svgIconsConfig],
  },
  typescript: {
    strict: true,
  },
})
