mobx 中对 observable（被监听对象） 的改变做出自动反应的方法有四个。

- computed：和我相关的 observable 改变我就执行，生成一个新的 observable
- autorun：我只在初始时执行一次，或者和我相关的 observable 改变时执行
- when：我只在条件达成的时候执行
- reation：初始时不会运行的 autorun，但是可以自己控制需要监听的值。

# computed

产生一个新的 observable 值。他的更改会触发页面的更新。

```javascript
import React from 'react'
import { observer, inject } from 'mobx-react'

const App = (props) => {
  const { appStore } = props
  const { changeNumber, showNumber } = appStore

  return (
    <div
      onClick={() => {
        changePrice(+new Date())
      }}
    >
      {total}
    </div>
  )
}

export default inject('appStore')(observer(App))
```

```javascript
import { observable, action } from 'mobx'

class AppStore {
  @observable number = 3333

  @action changeNumber = (number) => {
    this.number = number
  }

  get showNumber() {
    return this.number + 3
  }
}

export default AppStore
```

以上代码中的 showNumber 实际上就是一个 computed。onClick 触发以后 showNumber 会随之改变并且触发页面渲染

# autorun

autorun 可以在 store 运行的时候立即执行一次，或者等到其依赖值发生变化的时候再执行一次。

```javascript
import { observable, action } from 'mobx'

class AppStore {
  @observable number = 3333

  constructor() {
    autorun(() => {
      console.log('a?')
    })
    autorun(() => {
      console.log(this.number)
    })
    autorun(() => {
      throw error()
    })
  }

  @action changeNumber = (number) => {
    this.number = number
  }

  get showNumber() {
    return this.number + 3
  }
}

export default AppStore
```

以上代码当 appStore 第一次执行的时候，会打印 a? 和 3333。之后当每一次 number 改变的时候只有下方的 autorun 会执行，打印出 this.number

## autorun 的配置项。

```javascript

{
  dalay: 300, // 防抖时间
  name: 'test',
  onError: (err) => {}, // 在 autorun 和所有其他类型 reaction 中抛出的异常会被捕获并打印到控制台
  scheduler: () => {}
}

```

以下代码，在未 try catch 的情况下，每次触发 number 的更新后，onError 都可以捕获到抛出的错误

```javascript
import { observable, action } from 'mobx'

class AppStore {
  @observable number = 3333

  constructor() {
    autorun(
      () => {
        console.log(this.number)
        throw Error('aaa')
      },
      {
        onError: (err) => {
          console.log(err)
        },
      }
    )
    autorun(
      () => {
        try {
          throw Error('aaa')
        } catch (e) {
          console.log('catch', e)
        }
      },
      {
        onError: (err) => {
          console.log(err)
        },
      }
    )
  }

  @action changeNumber = (number) => {
    this.number = number
  }

  get showNumber() {
    return this.number + 3
  }
}

export default AppStore
```

# when

when 接受三个参数，当第一个参数的条件达成以后，就会执行第二个参数传入的函数。第三个参数为 options 参数。

```javascript

when(predicate: () => boolean, effect?: () => void, options?)

```

在没有提供第二个参数的情况下 when 会返回一个 promise 对象

```javascript

async function() {
  await when(() => this.isVisible)
}

```

# reaction

autorun 的变种，当创建 store 的时候 reaction 不会直接运行。

reaction 接受三个参数

- 参数一
  返回一个值，当这个值改变的时候执行第二个参数的函数

- 参数二
  一个函数，当参数一的函数返回值改变的时候自动执行，传入的参数是参数一的函数的返回值

- 参数三
  reaction 的配置项

```javascript

{
  fireImmediately: false, // 是否在 store 创建的时候自动执行
  delay: 300, // 防抖时间
  equals: () => boolean, // 比较器，用来比较参数与返回的前一个值和后一个值。比较器返回 false 参数二函数才会被调用。
  name: '',
  onError: () => {}, // 捕获 reaction 的错误
  scheduler: () => {}, // 自定义调度器，决定如何调度 autorun 函数的重新运行
}

```
