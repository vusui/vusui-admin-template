/*
 * @Description: Eslint配置(不需要的请删除)
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-18 09:50:54
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-20 11:07:07
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
    // 开启setup语法糖环境
    'vue/setup-compiler-macros': true
  },
  globals: {},
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended'
  ],
  // 注册插件
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  // 规则设置
  rules: {
    // 逻辑错误及最佳实践的规则：0 = off, 1 = warn, 2 = error
    'no-console': 'off',
    'no-debugger': 'off',
    // 禁止使用eval
    'no-eval': 2,
    // 禁止使用alert confirm prompt
    'no-alert': 2,
    // 在对象中使用getter/setter
    'accessor-pairs': 2,
    'block-spacing': [2, 'always'],
    // 大括号风格
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    // 避免多次调用回调什么的
    'callback-return': 0,
    // 要求使用骆驼拼写法
    camelcase: [
      2,
      {
        properties: 'always',
        // 忽略校验的属性
        allow: ['drop_console', 'drop_debugger']
      }
    ],
    // 对象字面量项尾不能有逗号
    'comma-dangle': [2, 'never'],
    // 逗号前后的空格
    'comma-spacing': 0,
    // 逗号风格，换行时在行首还是行尾
    'comma-style': [2, 'last'],
    // 循环复杂度
    complexity: [0, 11],
    // 非派生类不能调用super，派生类必须调用super
    'constructor-super': 0,
    // 必须使用 if(){} 中的{}
    curly: [2, 'all'],
    // 对象访问符的位置，换行的时候在行首还是行尾
    'dot-location': [2, 'property'],
    // 文件以单一的换行符结束
    'eol-last': 2,
    // 要求使用 === 和 !==
    eqeqeq: [
      'warn',
      'always',
      {
        null: 'ignore'
      }
    ],
    'for-direction': 2, // 禁止for无限循环
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // nodejs 处理错误
    'handle-callback-err': 0,
    // 函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ],
    // 要求使用 let 或 const 而不是 var
    'no-var': 2,
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2, // 禁止在函数定义或表达中出现重名参数
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2, // 禁止在对象字面量中出现重复的键
    'no-duplicate-case': 2, // 禁止重复 case 标签
    'no-empty': 2, // 禁止空块语句
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2, // 禁止重复的函数声明
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 1,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 0,
    'no-undef': 0, // 检查是否可用全局变量
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false
      }
    ],
    // 禁止在 return、throw、continue 和 break 语句后出现不可达代码
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': [
      2,
      {
        initialized: 'never'
      }
    ],
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    'padded-blocks': [2, 'never'],
    // 强制使用一致的单引号
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 1,
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false
      }
    ],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    yoda: [2, 'never'],
    'prefer-const': 2,
    'array-bracket-spacing': [2, 'never'],
    'no-prototype-builtins': 0,
    indent: 0,
    semi: [2, 'always'], // 强制使用分号
    'space-before-blocks': 0,
    'keyword-spacing': 0,
    'key-spacing': 0,
    'no-multiple-empty-lines': 0,
    'spaced-comment': 0,
    // always需要一个空格, never不允许任何空格。
    // 禁止函数圆括号之前有一个空格
    'space-before-function-paren': [
      0,
      {
        // 用于匿名函数表达式
        anonymous: 'ignore',
        // 用于命名函数表达式
        named: 'ignore',
        // 用于异步箭头函数表达式
        asyncArrow: 'ignore'
      }
    ],
    'arrow-spacing': 0,
    'object-curly-spacing': 0,
    // vue
    'vue/script-indent': [0, 2], // script缩进
    'vue/html-indent': [
      0,
      2,
      {
        // html缩进
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/html-closing-bracket-spacing': [
      2,
      {
        selfClosingTag: 'always'
      }
    ],
    'vue/max-attributes-per-line': [
      0,
      {
        singleline: 2,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    // 要求组件名（文件名）必须是多单词的
    'vue/multi-word-component-names': 0,
    // 不强制换行
    'vue/html-closing-bracket-newline': 'off',
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-unused-components': 0,
    'vue/html-self-closing': 0,
    'vue/attributes-order': [
      0,
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT'
        ],
        alphabetical: false
      }
    ],
    'prettier/prettier': [
      2,
      {
        endOfLine: 'auto'
      }
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          // Function: {
          //   message: 'Prefer a specific function type, like `() => void`.'
          // },
          // String: false,
          // Boolean: false,
          // Number: false,
          // Symbol: false,
          '{}': false,
          object: false,
          Object: false,
          Function: false
        }
      }
    ],
    '@typescript-eslint/indent': [2, 2],
    '@typescript-eslint/explicit-function-return-type': [
      2,
      {
        allowExpressions: true
      }
    ],
    '@typescript-eslint/no-this-alias': [
      2,
      {
        // Allow `const { props, state } = this`; false by default
        allowDestructuring: true,
        // Allow `const self = this`; `[]` by default
        allowedNames: ['self']
      }
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 1,
    // 关闭类型推断
    '@typescript-eslint/no-inferrable-types': 0,
    // 每个函数都要声明返回值
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        // Argument 'xxx' should be typed with a non-any type
        allowArgumentsExplicitlyTypedAsAny: true
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ]
  }
};
