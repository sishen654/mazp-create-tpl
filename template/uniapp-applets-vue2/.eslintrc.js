module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  extends: [
    'plugin:vue/recommended'      // vue2开启
  ],
  /*
    规则地址：https://eslint.vuejs.org/rules/
    'off' -> 0 关闭规则 'warn' -> 1 开启警告规则 'error' -> 2 开启错误规则
    打印时，log上方需添加：// eslint-disable
  */
  rules: {
    // 1 要求vue文件必须要有一个 name 属性
    "vue/require-name-property": 2,
    // 2 template 内必须使用 ===
    "vue/eqeqeq": 2,
    // 3 防止在 Vue 模板中使用 this
    "vue/this-in-template": 2,
    // 4 强制使用 HTML 属性的引号样式为双引号
    "vue/html-quotes": ["error", "double", { "avoidEscape": false }],
    // 5 绑定函数时 若没有参数的方法调用后 强制或禁止括号
    "vue/v-on-function-call": 2,
    // 6 name属性必须是大驼峰式（首字母大写）
    'vue/name-property-casing': ['error', 'PascalCase'],
    // 7 引入的组件名称为 PascalCase 的形式
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    // 8 引入的 props 不能使用 _，只能使用 大驼峰式。  如：a_content => aContent
    "vue/prop-name-casing": 2,
    // 9 规定 vue 组件中属性的排序
    "vue/order-in-components": ["error", {
      "order": [
        "el",
        "name",
        "layout",
        "head",
        "validate",
        "middleware",
        "transition",
        "scrollToTop",
        "loading",
        ["components", "directives", "filters"],
        ["props", "propsData"],
        "data",
        "computed",
        "watch",
        "methods",
        "asyncData",
        "fetch",
        "created",
        "mounted",
        "destroyed"
      ]
    }],


    // 1 注释后必须有一个空格(只有在上方注释才会使用该规则)
    'spaced-comment': ['error', 'always'],
    // 2 禁用隐式的eval() 比如 setTimeout('alert();', 100)
    "no-implied-eval": 2,
    // 3 代码后面必须加分号 ;
    // "semi": ['error', "always"],
    // 4 禁止使用 var 声明变量
    'no-var': 2,
    // 5 禁止多个空格
    "no-multi-spaces": ["error", { ignoreEOLComments: true }],


    // 1 禁止将 let 转换成 const（不会被重新分配的变量）
    "prefer-const": ["off"],
    // 2 允许在 template 中添加注释
    "vue/comment-directive": 0,
    // 3 允许使用v-html
    "vue/no-v-html": 0,
    // 4 关闭 强制每行的最大属性数
    "vue/max-attributes-per-line": 0,
    // 5 取消在单行元素的内容前后换行
    "vue/singleline-html-element-content-newline": 0,
    // 6 关闭 在标签的右括号前要求或禁止换行
    "vue/html-closing-bracket-newline": 0,
    // 7 关闭 强制执行属性顺序
    "vue/attributes-order": 0,
    // 8 关闭 强制自闭式
    "vue/html-self-closing": 0,
    // 9 组件需要多个单词组成名字
    "vue/multi-word-component-names": 0,
    // 10 组件需要name
    "vue/require-name-property": 0,
    // 11 关闭template强制缩进为2
    "vue/html-indent": 0,
    // 12 关闭强制第一行属性
    "vue/first-attribute-linebreak": 0
  }
}
