#  基础
##  基本使用

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

resolve  和  reject  的参数会传递给回调函数。

##  如果  resolve  的参数是  promise

```javascript
const p1 = new Promise(function (resolve, reject) {})
const p2 = new Promise(function (resolve, reject) {
  resolve(p1)
})
```

此时  p1  的状态会传递给  p2。p2  的状态将会由  p1  来决定。
p1 padding：p2 padding
p1 resolve | reject：p2  将会立即执行

```javascript
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})
const p2 = new Promise(function (resolve, reject) {
  // 虽然p2 1s 后已经resolve 了。
  // 但是因为resolve返回的是另一个promise 导致了此时 p2 的成功状态无效了
  setTimeout(() => resolve(p1), 1000)
})
// 3s 后p1 失败。导致 p2 也失败了触发了 catch
p2.then((result) => console.log(result)).catch((error) => console.log(error))
// Error: fail
```

## promise  的  then
1. then  的第一个参数是  resolve  时候的回调函数。第二个参数是  reject  状态的回调函数。
2. then  返回的是一个新的  promise  实例。
3. then  如果  return  的是一个  promise，后续的  then  会等待  promise  的执行

## promise  的  catch
promise  的  catch  可以既可以用来捕获  promise reject  抛出的错误，也可以捕获代码运行中的错误。

catch  返回的同样是一个  promise  对象

catch  实际上可以用  then(null, rejection)  或者  then(undefined, redection)来实现
例如

```javascript
p.then((val) => console.log('fulfilled:', val)).catch((err) =>
  console.log('rejected', err)
)

// 等同于
p.then((val) => console.log('fulfilled:', val)).then(null, (err) =>
  console.log('rejected:', err)
)
```

### promise  错误特性
#### promise  中在已经 resolve  后才抛出的错误不会被 catch 捕获

```javascript
new Promise((resolve, reject) => {
  resolve('res');
  throw new Error('test);
}).then(val => {
  console.log(val)
}).catch(err => {
  console.log(err);
})
```

以上代码的  error  是在  resolve  之后产生的。所以  catch  已经无法捕获到错误了。

####  错误具有冒泡的特性

错误会一直向后传递，最终被一个  catch  捕获为止。

####  如果没有  catch promise  对象抛出的错误不会传递到外层

```javascript
const test = () => {
  return new Promise((res, rej) => {
    res(x + 3)
  })
}
test().then((val) => {
  console.log(val)
})
console.log(123)
```

上面的代码会先打印一个错误  x is undefined。但是并不会退出进程，然后在打印出  123。
要注意下面这种情况

```javascript
new Promise((res, jes) => {
  res('ok')
  setTimout(() => {
    throw new Error()
  }, 0)
}).then((val) => {
  console.log(val)
})
```

上面这段程序会先输出  ok  然后抛出错误。

因为  setTimeout  将错误指定在了下一个时间循环中。此时  promise  的运行已经结束。所以相当于是在  promise  外抛出了错误。

一般建议  promise  后面总是有个  catch  方法。

# Promise.finally()

不管  Promise  最后状态如何总会执行。于  ES2018  引入。
finally  不接受任何参数。所以没有办法知道  promise  最终是  resolve  还是  reject。
所以  finally  中处理的逻辑应该是和状态无关，不依赖  Promise  执行结果。
例如可以使用该方法关掉服务。

```javascript
server
  .listen(prot)
  .then(() => {
    // do something
  })
  .finally(server.stop)
```

**本质上说，finally  是  then  的特例**

```javascript
promise.finally(() => {})
// 等价于
promise.then(
  (result) => {
    return result
  },
  (error) => {
    throw error
  }
)
```

**finally  的实现方法**

```javascript
Promise.prototype.finally = function () {
  let P = this.constructor
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) =>
      P.resolve(callback()).then(() => {
        throw reason
      })
  )
}
```

从  finally  的实现可以看出来  finally  总是返回以前的值

```javascript
// resolve 的值是 undefined
Promise.resolve(2).then(
  () => {},
  () => {}
)
// resolve 的值是 2
Promise.resolve(2).finally(() => {})
// reject 的值是 undefined
Promise.reject(3).then(
  () => {},
  () => {}
)
// reject 的值是 3
Promise.reject(3).finally(() => {})
```

# Promise.all
将多个  promise  实例包装成一个新的  Promise  实例。接受一个数组作为参数，如果数组的成员不是  promise  对象则会先调用以下  Promise.resolve  将其转换成  promise  对象，然后再进一步处理。
只有当所有的  Promise  对象全部  resolve  或者有一个  reject  后。Promise.all  才会调用后面的回调函数。
**Promise.all  也可以接受非数组参数，但是要求其必须有  Iterator  接口且返回的必须是  Promise  对象**
**如果作为参数的  promise  对象有自己的  catch  方法。那么一旦  reject  其并不会出发  all  的  catch**

```javascript
const p1 = new Promise((res, rej) => {
  res('hello')
})
  .then((result) => result)
  .catch((e) => e)
const p2 = new Promise((res, rej) => {
  throw new Error('报错了')
})
  .then((result) => result)
  .catch((e) => e)
Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((e) => console.log(e))
// ['hello', Error: 报错了]
```

# Promise.race
基本属性和  promise all  一样
**不同点**
其中只要有一个  promise  改变状态，那么  promise race  的状态就会改变。

# Promise.allSettled
基本属性和  promise all  一样
**不同点**
1.  于  ES2020  引入
2.  只有等所有的参数的  promise  都返回（不管状态），才会执行后面的回调。
3.  该方法返回新的  promise  实例，状态总是  fulfilled，不会变成  rejected。最后的回调函数接受到的是一个数组。每个成员对应一个传入  Promise.allSettled()  的  Promise  实例。

```javascript
const res = Promise.resolve(42)
const rej = Promise.reject(-1)
const allSettled = Promise.allSettled([res, rej])
allSettled.then((res) => {
  console.log(res)
})
//[{status: 'fulfilled', value: 42}, {status: 'rejected', reason: -1}]
```

有时候我们并不关心异步操作的结果，只关心这些操作是否已经结束，那么  allSettled  就会很实用。

# Promise.any
基本属性和  promise all  相同
**不同点**
1.  截至  2020 06/06  他还是一个提案。
2.  只要有一个  promise  参数  fulfilled  那么  promise all  就会变成  fulfilled。只有所有的参数  promise  都  reject promise any  才会变成  reject
promise any  和  promise race  很像。只有一点不同：不会因为某个  promise  参数  rejected  而结束。
# Promise.resolve()
**如果参数是非  promise  对象**
可以将现有的对象转换成  promise  对象

```javascript
Promise.resolve('foo')
new Promise((resolve) => resolve('foo'))
```

**参数是  promise  对象**
不会做任何修改直接放回传入的  promise  对象
**参数是具有  then  的对象**
会将该对象转成  promise  对象。然后立即执行  then  对象的  then  方法。

```javascript
console.log(1)
let then = {
  then: (res, rej) => {
    console.log(2)
    res(42)
  },
}
console.log(3)
let p1 = Promise.resolve(then)
p1.then((value) => {
  console.log(4)
  console.log(value)
})
```

**参数不具有  then  方法，或者根本不是对象**
返回一个新的  promise  对象，状态为  resolve
**不带有任何参数**
直接返回一个  resolved  状态的  promise  对象

```javascript
const p = Promise.resolve()
p.then(() => {})
```

p  就是一个  promise  对象。
立即执行  resolve  的  promise  对象是在本轮时间循环结束的时候执行，而不是在下一轮事件循环开始的时候。

```javascript
setTimeout(() => {
  console.log(3)l
}, 0)
Promise.resolve().then(() => {
  console.log(2)
})
console.log(1)
```

setTimeout  是在下一轮事件循环开始的时候执行。
以上代码会输出  1 2 3
# Promise.reject
基本情况和  Promise.resolve  相同。
**不同点**
1.  返回的  promise  的状态是  reject
2.  参数会原封不动的作为  reject  的理由变成后续方法的参数。
# Promise.try
无论函数是同步还是异步，但是想用  promise  来处理。就可以使用  Promise try。此时就可以使用  then  来指定下一步流程，用 catch  来捕获错误。
