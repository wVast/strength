# 基本概念

一个模块可能有多个方法。只要其中的某个方法使用到了，整个文件就会被打包。tree shaking 可以只把用到的方法打包，无用的代码会在 uglify 阶段被删除掉。

- tree shaking 只支持 es6 的写法
- webpack 默认支持，在 .babelrc 里面设置 modules: false 即可。mode 为 production 时默认开启。

## 实现准则 - DCE

- 代码不会被执行，不可达到。
- 代码执行结果不会被用到
- 代码只会影响死代码

## 为什么只支持 es6

因为 es6 的模块有如下特点

1. import 只能作为模块顶层的语句出现
2. import 的模块只能是字符串常量
3. import binding 是 immutable 的
