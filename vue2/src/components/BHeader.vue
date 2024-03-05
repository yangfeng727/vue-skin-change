<template>
    <div class="header">
        顶部导航栏 - <strong>当前主题为 {{ theme }}</strong>
        <div class="tool">
            <el-button type="primary" @click="changeTheme">换肤</el-button>

            <span class="cg"> element-ui 主题色换肤：</span>
            <!-- <theme-picker class="right-menu-item hover-effect" @change="themeChange"></theme-picker> -->
            
        </div>
    </div>
</template>

<script>
import { setElementTheme, setTheme, getTheme } from '@/utils/theme'
import ThemePicker from './ThemePicker/index.vue'
export default {
    components: {
        ThemePicker
    },
    data() {
        return {
            theme: ''
        }
    },
    mounted() {
        this.getProjectTheme()
    },
    methods: {
        getProjectTheme() {
            this.theme = getTheme()
        },
        changeTheme() {
            setTheme(getTheme() === 'light' ? 'dark' : 'light')
            this.getProjectTheme()
        },
        themeChange(val, valJSON) {
             //将拿到的颜色存到localstorage里
             setElementTheme(val)
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    flex: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    position: relative;
    background-color: var(--headerBg);
    border: 1px solid #dddddd;
}

.tool {
    position: absolute;
    right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.cg{
    margin-left: 5PX;
}
</style>