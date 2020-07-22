webpack 打包会产生大量的函数闭包代码。业务代码模块越多，产生的闭包作用域就越多。会导致如下问题

- 打包体积增大，模块越多越明显。
- 运行代码时创建的函数作用域变多，内存开销变大。

webpack 之所以会打包很多函数作用域出来主要还是为了兼容性考虑，被 webpack 处理过的代码会带上一层包裹，代码中的 import 会被转换成 webpack_require

TODO webpack 模块机制

# scope hoisting 原理

将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量防止名称冲突。

通过 scope hoisting 可以减少函数声明代码和内存开销

## 如何开启

- webpack4 中 mode 值是 production 自动会开启，必须是 es6 语法。CJS 不支持。

- webpack3 中 需要在 config 增加一个插件

```javascript
module.exports = {
  entry: {
    app: './src/app',
  },
  output: {
    filename: '[name]_[chunkhash:8].js',
    path: __dirname + '/dist',
  },
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
}
```
