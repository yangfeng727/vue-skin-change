<template>
    <div class="header">
        顶部导航栏 - <strong>当前主题为 {{ theme }}</strong>
        <div class="tool">
            <el-button type="primary" @click="changeTheme">换肤</el-button>
        </div>
    </div>
</template>

<script>
import { setTheme, getTheme } from '@/utils/theme'
export default {
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
}
</style>