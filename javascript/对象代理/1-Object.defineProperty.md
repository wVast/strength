Object.defineProperty 是属性描述对象中的一个方法

Object.defineProperty 可以修改或增加对象的属性

```javascript
Object.defineProperty(obj, prop, descriptor)
```

- obj：目标对象
- prop：需要更改的方法名称
- descriptor：props 所具有的特性
  - value：props 的值，默认 undefined
  - writable：属性值是否可以被更改，默认 false
  - enumerable：属性是否可枚举，默认 false
  - configurable：是否可以删除或再次修改，默认 false
  - getter/setter：获取和设置属性方法

**当使用了 getter 和 setter 后不允许使用 writable 和 value**

## value

```javascript
var obj = {}

Object.defineProperty(obj, 'key', {})

console.log(obj) // { key: undefined }

Object.defineProperty(obj, 'key', {
  value: 'myKey',
})

console.log(obj) // { key: 'myKey' }
```

## writable

```javascript
var obj = {}

Object.defineProperty(obj, 'key', {
  value: 'myKey',
  writable: false,
})

obj.key = 'change key' // 并不会报错，只是更改失败

console.log(obj) // { key: 'myKey' }
```

```javascript
var obj = {}

Object.defineProperty(obj, 'key', {
  value: 'myKey',
  writable: true,
})

obj.key = 'change key 2'

console.log(obj) // { key: 'change key 2' }
```

## enumerable

是否可以使用 for in 或者 Object.keys() 进行枚举

```javascript
var obj = {}

Object.defineProperty(obj, 'key', {
  value: 'myKey',
  enumerable: false,
})

for (var i in obj) {
  console.log(i) // 什么也没打印出来
}
```

## configurable

1. 属性是否可以使用 delete 删除
2. 属性是否可以再次设置特性

configurable 和 writable 是不同的

writable 是否可以重设 value。

而 configurable 则是是否可以再次调用 Object.defindProperty 重设属性。

```javascript
var obj = {}

Object.defineProperty(obj, 'key', {
  value: 'myKey',
  writable: true,
  configurable: false,
})

obj.key = 'myKey2' // 成功

delete obj.key

console.log(obj) // { key: 'myKey2' }

Object.defineProperty(obj, 'key', {
  value: 'myKey3',
}) // 报错
```

# get 和 set

```javascript
var obj = {}
var reValue = 'reValue'

Object.defineProperty(obj, 'newKey', {
  get: function () {
    return reValue
  },
  set: function (value) {
    reValue = value
  },
})

console.log(obj.newKey) // reValue

obj.newKey = 'this is set value'

console.log(obj.newKey) // 'this is set value'

console.log(obj) // {}
```
