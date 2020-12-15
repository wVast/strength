# 基本概念和使用

用于重新定义对象的基本操作，例如更改属性查找、赋值、函数调用等。

```javascript
const p = new Proxy(target, handler)
```

- target：要代理的源对象，可以是 js 中任意的对象：数组，对象，函数等
- handler：自定义操作集。
- p：被代理后生成的新对象。拥有 target 所有的属性和方法

## 基本使用

```javascript

const obj = {
  a: 1,
  b: 2
}

const p = new Proxy(obj, {
  get(target, key, value) {
    if (key === 'c') {
      return '自定义结果'
    }
    return target[key]
  },
  set(target, key, value) {
    if (value === 4) {
      target[key] = '自定义结果'
    } else {
      target[key] = value
    }
  }
})

console.log(obj.a) // 1
console.log(obj.c) // undefined
console.log(p.c) // 1
console.log(p.c) // 自定义结果

obj.name = 'zhang'
console.log(obj.name) // zhang
obj.age = 4
console.log(obj.age) // 4


p.name = 'zhang'
p.age = 4
console.log(p.name) // zhang
console.log(p.age) // 自定义结果
```

# proxy 是如何工作的

proxy 主要是用 handler 代理了 target 上的原生方法。handler 本身就是 ES6 新设计的一个对象，用来自定义代理对象的各种可代理操作。handler 具有 13 种方法，每种方法可以代理一种操作。

```javascript
// 在读取代理对象的某个属性的时候触发
// proxy.foo  proxy['foo']
handler.get(target, propKey, receiver)

// 在给代理对象属性赋值的时候触发
// proxy.foo = 1 proxy['foo'] = 1
handler.set(target, propKey, value, receiver)

// 判断代理对象是否有某个方法的时候触发
// 'foo' in proxy
handler.has(target, propKey)

// 在删除代理对象的某个属性的时候触发
// delete proxy.foo
handler.deleteProperty()

// 在获取代理对象所有属性 key 的时候触发，
// 比如 Object.getOwnPropertyNames(proxy)
// Object.getOwnPropertySymols(proxy)
// Object.keys(proxy)
// for .. in ..
handler.ownKeys()

// 获取代理对象某个属性的属性描述时触发
// Object.getOwnPropertyDescriptor(proxy, 'foo')
handler.getOwnPropertyDescriptor()

// 定义代理对象某个属性的属性描述时触发
// Object.defineProperty(proxy, propKey, propDesc)
// Obejct.defineProperties(proxy, propDescs)
handler.defineProperty()

// 判断一个对象代理是否可扩展时触发
// Object.isExtensible(proxy)
handler.isExtensible()

// 设置代理对象原型时触发
// Object.setProtypeOf(proxy, proto)
handler.setPrototypeOf()

// 读取代理对象原型时触发。比如 Object.getProtypeOf(proxy)
handler.getPrototypeOf()

// 让代理对象不可扩展时触发，比如 Object.preventExtensions(proxy)
handler.preventExtensions()

// 对象为函数代理对象，当其被调用的时候触发，比如 proxy
handler.apply()

// 对象为构造函数的代理对象构造实例的时候触发，比如 new _proxy()
handler.construct()
```

## this 问题

proxy 并不是透明代理，即使不做任何拦截也无法保证目标对象和原对象行为一致。

主要原因是 proxy 代理下，目标对象内部的 this 会指向 proxy 代理。

```javascript
const target = {
  m: function () {
    console.log(this === proxy)
  },
}
const handler = {}

const proxy = new Proxy(target, handler)

target.m() // flase
proxy.m() // true
```

# Proxy 作用

Proxy 的作用主要可以分为以下几方面

- 拦截和监视外部对象访问
- 降低函数或类的复杂度
- 在复杂操作前对操作进行校验或对资源进行管理
