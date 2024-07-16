<div align="center"><h1>该项目整合Vue3相关的所有内容</h1></div>

### 目录展示
```markdown
├── build # 打包脚本相关
│   ├── config # 配置文件
│   ├── generate # 生成器
│   └── vite # vite配置
├── mock # mock文件夹
└── vite.config.ts # vite配置文件
```
### 插件使用
1. unplugin-auto-import
```markdown
pnpm i unplugin-auto-import -D
```
unplugin-auto-import用于自动按需导入相关API，只需要在imports中插入我们想要的库，我们在使用库中的方法就不需要手动导入，比如vue的ref，我们可以直接使用，不需要导入它。我们可以看到在根目录下生成了auto-imports.d.ts，这个文件是类型文件，该插件主动帮我们生成的，目的是为了让ts类型检查的时候不报错，因此我们还需要再tsconfig.json的include中手动引入。
```javascript
AutoImport({
  imports: ['vue', 'vue-router'],
  eslintrc: {
    enabled: true,
    filepath: './.eslintrc-auto-import.json'
  }
})
```
- 静态分析
    - 该插件会在编译时或打包时对代码进行静态分析，识别使用的API，如代码中使用了ref，插件会知道从vue中导入这个函数
- 动态导入
    - 基于静态分析，该插件会自动在合适的位置插入import语句（这是编译时我打开浏览器加载的源文件看到的，我并没有在文件中导入ref，是该插件帮我导入的import { ref } from "/node_modules/.vite/deps/vue.js?v=f868ce00";）
- 按需打包
    - 该插件在编译时或打包时动态插入导入语句，它能确保只有真正用到的api会被打包进最终的输出文件中，这意味着即使库很大，只用了小部分的API，打包后体积也会很小

2. unplugin-vue-components
```markdown
pnpm i unplugin-vue-components -D
```
该插件会扫描Vue文件，识别出所有的自定义组件标签（未被正确导入的标签），监听文件变化，并自动添加对应的导入语句（我们可以看到浏览器加载当前页面的源文件中是有import涉及到的组件的，只是没在代码中体现，该插件帮我们做了这件事）。并且帮助我们自动生成components.d.ts类型文件，当文件发生变化该类型文件会自动更新（这就是每次我们拉了代码之后components.d.ts文件会变更的原因，是插件帮助我们更新了类型文件）


### vite配置相关
1. process：该对象是node.js环境中的一个特殊的对象，提供了当前node.js进程的信息，不能直接在js中使用，浏览器环境不支持原生的process对象。但是在vite或者其他前端构建工具的开发环境中，由于利用的rollup，webpack或esbuild的打包器，都是**基于node.js环境运行开发服务器的**，因此在vite.config.ts或者.env文件可以访问
2. define：就是定义全局的常量，控制环境变量（如环境变量）、API端点、版本信息等非常有用


### 修改element-plus主题色
为什么使用@use，而不用@import
```markdown
编译前
// component-a.scss
@import 'variables';
.component-a {
color: $primary-color;
}

// component-b.scss
@import 'variables';
.component-b {
background-color: $secondary-color;
}
编译后
/* 编译后的部分CSS */
.component-a {
color: #1a1a1a;
}

.component-b {
background-color: #f1f1f1;
}

// 重复的部分
$primary-color: #1a1a1a;
$secondary-color: #f1f1f1;
$primary-color: #1a1a1a;
$secondary-color: #f1f1f1;
a中和b中都引入变量文件，会导致编译后css中出现2份重复的变量定义

// 使用 @use 重构
// _variables.scss 保持不变

// component-a.scss
@use 'variables' as *; // 使用 * 导入所有变量到当前作用域，无须命名空间
.component-a {
color: $primary-color;
}

// component-b.scss
@use 'variables' as *; // 同上
.component-b {
background-color: $secondary-color;
}
```

### 解决import.meta.env报错问题
需要再tsconfig.json中加入
```markdown
"types": ["vite/client"]
```
在vite.config.ts中不能使用import.meta，只能如下方式获取环境变量
```markdown
import { defineConfig, loadEnv } from 'vite'
export default (({ mode }) => {
    const VITE_APP_SERVER_URL: string = loadEnv(mode, process.cwd()).VITE_APP_SERVER_URL;
    return defineConfig({})
})

```
