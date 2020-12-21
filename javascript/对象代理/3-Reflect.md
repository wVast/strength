# 概念

Reflect 的设计目的如下

1. 将 Object 明显属于语言内部的方法放在 Reflect 对象上。Reflect 可以拿到语言内部的方法。
2. 修改某些 Object 方法的返回。Object.defineProperty(obj, name, desc) 在无法定义属性的时候会抛错，而 Reflect.defineProperty(obj, name, desc) 则会返回 false。
3. 让 Object 的操作变为函数行为，例如 name in obj 可以变成 Reflect.has(obj, name)
4. Reflect 方法和 Proxy 方法一一对应，可以让 Proxy 方便的调用对应的 Reflect 方法完成默认行为。也就是说当 Proxy 修改了默认行为后，仍然可以在 Reflect 上获取默认行为。
