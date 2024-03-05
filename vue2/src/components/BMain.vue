<template>
  <div class="mian-content">
    <h2>element ui 官网demo - 换肤：<a href="https://element.eleme.cn/#/zh-CN/component/custom-theme"
        target="_blank">element-ui 官网主题换肤方案地址</a></h2>
    <div class="recommend">

      <div class="temp-one">
        <p class="title">1.主题编辑器</p>
        <p>可视化配置界面，可以对scss变量进行在线修改，实时预览样式改变后的视觉。但是官网打开报错 - Server Error 500 - 无法体验 ---- <span
            class="final">如果官网能运行是最推荐的，提前配置好element ui样式后再导入项目</span></p>
      </div>

      <div class="temp-one">
        <p class="title">2.仅替换主题色</p>
        如果仅希望更换 Element 的主题色，推荐使用
        <a href="https://elementui.github.io/theme-chalk-preview/#/zh-CN" target="_blank">在线主题生成工具</a>。
      </div>

      <div class="temp-one">
        <p class="title">3.在项目中改变 SCSS 变量</p>
        <p>Element 的 theme-chalk 使用 SCSS 编写，如果你的项目也使用了 SCSS，那么可以直接在项目中改变 Element 的样式变量。新建一个样式文件，例如
          element-variables.scss，写入以下内容：</p>
        <pre>
          <code class="hljs">
          /* 改变主题色变量 */
          $--color-primary: teal;

          /* 改变 icon 字体路径变量，必需 */
          $--font-path: '~element-ui/lib/theme-chalk/fonts';

          @import "~element-ui/packages/theme-chalk/src/index";
          </code>
        </pre>
        <p>之后，在项目的入口文件中，直接引入以上样式文件即可（无需引入 Element 编译好的 CSS 文件）：</p>
        <pre>
          <code class="hljs">
            import Vue from 'vue'
            import Element from 'element-ui'
            import './element-variables.scss'

            Vue.use(Element)
          </code>
        </pre>

        <strong>原理：element ui 内部scss 变量使用 !default 赋值，因此这里可以在引入element ui样式文件前先定义scss变量，覆盖内部的 !default scss变量，实现换肤！</strong>
      </div>

      <div class="temp-one">
        <p class="title">4.命令行主题工具 --- 安装报错。。。</p>
      </div>

      <div class="temp-one">
        <p class="title">5.手写不同主题下的element ui样式，直接覆盖原有样式</p>
      </div>

    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 10px;
}

.recommend {
  margin: 20px 0;
  text-align: left;

  .temp-one {
    border: 1px solid red;
    padding: 10px;
    margin-bottom: 5px;
    background-color: #FFC107;

    .title {
      font-weight: bold;
    }

    .final {
      font-weight: bold;
    }
  }
}

.hljs {
  // line-height: 1.8;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
  font-size: 12px;
  padding: 18px 24px;
  background-color: var(--codeBgColor);
  border: 1px solid #eaeefb;
  margin-bottom: 25px;
  border-radius: 4px;
  -webkit-font-smoothing: auto;
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #000000;
}
</style>