const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
})
