let themeKey = '_theme'

export let themes = ['light','dark'] // 所有主题
let defaultTheme = themes[0] // 默认主题
export function setTheme(val) {
    let theme = val || defaultTheme
    localStorage.setItem(themeKey, theme)
    document.documentElement.setAttribute('theme', theme)

    // app 节点添加样式类
    let domApp = document.documentElement
    if(!domApp) return
    themes.map(item=>{
        domApp.classList.remove(`theme-${item}`);
    })
    domApp.classList.add(`theme-${theme}`)
}
export function getTheme() {
    return localStorage.getItem(themeKey)
}

/**
 * 获取css 变量
 * @param {*} cssKey css 变量名称，eg：--main-color
 * @param {*} dom 从哪个dom获取，默认根节点
 * @returns 
 */
export function getCssVariable(cssKey, dom) {
    if (!cssKey) return ''
    let _dom = dom || document.documentElement
    let val = ''
    try {
        val = getComputedStyle(_dom).getPropertyValue(cssKey)
    } catch (e) { }
    return val
}

// element-ui 主题色
export function setElementTheme (val) {
    return localStorage.setItem('elementUiTheme', val)
}
 
export function getElementTheme() {
    return localStorage.getItem('elementUiTheme')
}
 
/**
 * 生成颜色对应的衍生色 - 【对应 element - ui 衍生色生成规则】
 * 入参：67c23a
 * 结果：['67c23a', '103,194,58', '#76c84e', '#85ce61', '#95d475', '#a4da89', '#b3e19d', '#c2e7b0', '#d1edc4', '#e1f3d8', '#f0f9eb', '#5daf34']
 */
export function getThemeCluster (theme) {
    const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)
 
        if (tint === 0) {
            // when primary color is in its rgb space
            return [red, green, blue].join(',')
        } else {
            red += Math.round(tint * (255 - red))
            green += Math.round(tint * (255 - green))
            blue += Math.round(tint * (255 - blue))
 
            red = red.toString(16)
            green = green.toString(16)
            blue = blue.toString(16)
 
            return `#${red}${green}${blue}`
        }
    }
 
    const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)
 
        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)
 
        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)
 
        return `#${red}${green}${blue}`
    }
 
    const clusters = [theme]
    for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
    }
    clusters.push(shadeColor(theme, 0.1))
    console.log('主题色系-------------------', clusters)
    return clusters
}
 
//更改替换主题颜色
export function updateStyle (style, oldCluster, newCluster) {
    let newStyle = style
    oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
    })
    return newStyle
}