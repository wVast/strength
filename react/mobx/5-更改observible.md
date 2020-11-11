要更改 observable 可以有两种方法

- 使用 action
- 直接更改 observable

# action

最安全的更改 observable 的方式。如果在 mobx 中可以配置只能通过 action 来更改 observable

```javascript

@action changeNumber = (number) => {
  this.number = number
  this.obj.num = number
}

```

## 异步的 action

action 只会对当前运行的函数做出反应。

如果直接运行的函数中存在异步函数，而异步函数中又更改了 observable，那么 action 不会对这个异步调用的函数做出反应。

除非这个异步调用的函数同样用 action 包裹。

```javascript

@action changeNumber = (number) => {
  this.number = number // 正常
  this.changeNumberTwo(number) // 正常

  setTimeout(() => {
    this.changeNumberTwo(number) // 报错了
    this.changeNumberThree(number) // 正常
  }, 200)
}

changeNumberTwo = (number) => {
  this.number = number
}

@action changeNumberThree = number => {
  this.number = number
}

```

或者使用 runInAction 工具函数

```javascript

@action changeNumber = (number) => {
  this.number = number // 正常
  this.changeNumberTwo(number) // 正常

  setTimeout(() => {
    runInAction(() => {
      this.number = number
    })
  }, 200)
}

```

使用 flow 生成器

```javascript
changeNumber = flow(function* () {
  const res = yield this.createNumber()

  this.number = res // 正常
})

createNumber = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(+new Date())
    }, 100)
  })
}
```
