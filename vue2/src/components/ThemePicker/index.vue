<!-- 
参考：https://blog.csdn.net/qq_28222917/article/details/129520621
多色换肤参考：https://www.jb51.net/article/282348.htm

 -->

<template>
    <el-color-picker v-model="theme"
        :predefine="['#409EFF', '#1890ff', '#304156', '#212121', '#11a983', '#13c2c2', '#6959CD', '#f5222d']"
        class="theme-picker" popper-class="theme-picker-dropdown" />
</template>

<script>
// const version = require('element-ui/package.json').version
const ORIGINAL_THEME = '#409EFF'
import { getThemeCluster, updateStyle, getElementTheme } from '@/utils/theme'

export default {
    data() {
        return {
            chalk: '',
            theme: getElementTheme() ?? ORIGINAL_THEME,
        }
    },
    watch: {
        theme: {
            async handler(val) {
                const oldVal = this.chalk ? this.theme : ORIGINAL_THEME
                if (typeof val !== 'string') return

                const themeCluster = getThemeCluster(val.replace('#', ''))
                const originalCluster = getThemeCluster(oldVal.replace('#', ''))
                const $message = this.$message({
                    message: '  正在切换主题',
                    customClass: 'theme-message',
                    type: 'success',
                    duration: 0,
                    iconClass: 'el-icon-loading',
                })

                const getHandler = (variable, id) => {
                    return () => {
                        const originalCluster = getThemeCluster(ORIGINAL_THEME.replace('#', ''))
                        const newStyle = updateStyle(this[variable], originalCluster, themeCluster) // 将 element ui 样式文件中的颜色替换
                        let styleTag = document.getElementById(id)
                        if (!styleTag) {
                            styleTag = document.createElement('style')
                            styleTag.setAttribute('id', id)
                            document.head.appendChild(styleTag)
                        }
                        styleTag.innerText = newStyle
                    }
                }

                if (!this.chalk) {
                    // const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
                    const url = '/elementUIBaseCss/index.css' // 写死为 element-ui@2.15.14 下的index.css
                    // 或者直接放到js里面，引入进来，就不用去请求了，eg import ElementUiCSS from './ElementUiCSS.js' 
                    await this.getCSSString(url, 'chalk')
                }

                const chalkHandler = getHandler('chalk', 'chalk-style')

                chalkHandler()

                const styles = [].slice.call(document.querySelectorAll('style')).filter(style => {
                    const text = style.innerText
                    return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
                })
                styles.forEach(style => {
                    const { innerText } = style
                    if (typeof innerText !== 'string') return
                    style.innerText = updateStyle(innerText, originalCluster, themeCluster)
                })

                this.$emit('change', val, themeCluster)

                $message.close()
            },
            immediate: true
        }
    },

    methods: {
        getCSSString(url, variable) {
            return new Promise(resolve => {
                const xhr = new XMLHttpRequest()
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
                        // .replace(/.el-icon-[a-zA-Z0-9-:^]+before{content:"[^}]+}/g, '') // 去掉图标样式
                        // setThemeChalk(this[variable])
                        resolve()
                    }
                }
                xhr.open('GET', url)
                xhr.send()
            })
        },
    },
}
</script>

<style lang="scss">
// .theme-message,
// .theme-picker-dropdown {
//     z-index: 99999 !important;
// }

// .theme-picker .el-color-picker__trigger {
//     height: 26px !important;
//     width: 26px !important;
//     padding: 2px;
// }

.theme-picker-dropdown .el-color-dropdown__link-btn {
    display: none;
}

// .el-color-picker__color-inner {
//     background-color: $commonColor !important;
// }


.theme-picker-dropdown .el-color-predefine__color-selector {
    box-shadow: none !important;
}
</style>