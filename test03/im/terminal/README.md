# babel 配置说明

    1. @babel/preset-env 拥有根据 useBuiltIns 参数的多种polyfill实现，优点是覆盖面比较全（entry）， 缺点是会污染全局， 推荐在业务项目中使用
        entry 的覆盖面积全， 但是打包体积自然就大，
        useage 可以按需引入 polyfill, 打包体积就小， 但如果打包忽略node_modules 时如果第三方包未转译则会出现兼容问题
    2. @babel/runtime 在 babel 7.4 之后大放异彩， 利用 corejs 3 也实现了各种内置对象的支持， 并且依靠 @babel/plugin-transform-runtime 的能力，沙箱垫片和代码复用， 避免帮助函数重复 inject 过多的问题， 该方式的优点是不会污染全局， 适合在类库开发中使用