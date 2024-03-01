let themeKey = '_theme'
let defaultTheme = 'light' // 默认主题
export function setTheme(val) {
    let theme = val || defaultTheme
    localStorage.setItem(themeKey, theme)
    document.documentElement.setAttribute('theme', theme)
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