observable 用来将普通数据转换成为可以被监听的对象。

根据监听的数据结构不同，observable 会生成不同的结果。

# observable 的 options

```javascript
observable([], {
  deep: true,
  // 禁用自动的 observable 转换
  ref: false,
  // 只是创建一个 observable 引用
  shallow: false,
  struct: false,
})
```

# value 是对象

此时会生成一个新的克隆对象，并将这个克隆对象变为被监听的。

只有普通的对象可以转换成 observable object。

如果对象用构造函数生成，可以在构造函数上使用 @observable，或者使用 extend Observable

```javascript
import { observable, autorun, action } from 'mobx'

const person = observable(
  {
    name: 'zonglian',
    age: 27,
    showAage: false,
    home: { oldHome: 'taiyuan' },
    get labelText() {
      return [this.name, this.age, this.home.oldHome]
    },
    setAge(age) {
      this.age = age
    },
  },
  {
    setAge: action,
  }
)

autorun(() => console.log(person.labelText))

person.name = 'zonglian2'

person.setAge(28)

person.home.newHome = 'shagnhai'
```

当 object 被 observable 变为被监听对象后会发生如下变化

- getter 会自动转变为衍生属性。
- observable 会递归监听整个对象，包括后续增加的对象。

# value 是数组

value 是数组，则返回一个 Observable Array。此时数组中所有的元素包括后续 push 进来的元素都会被监听。同时 Observable Array 支持所有原生数组方法和 observable 提供的衍生方法。

```javascript
import { observable, autorun } from 'mobx'

var todos = observable([
  { title: 'test1', completed: true },
  { title: 'test2', completed: false },
])

autorun(() => {
  console.log(
    'remaining:',
    todus
      .filter((todo) => !todo.completed)
      .map((todo) => todo.title)
      .join(', ')
  )
})

// 输出: 'Remaining: test2'

todos[0].completed = false
// 输出: 'Remaining: test1 test2'

todos[2] = { title: 'test3', completed: false }
// 输出: 'Remaining: test1 test2 test3'
```

## observable 提供的衍生方法

- intercept(interceptor)：在数组产生任何变化前进行拦截。
- observe(listener, fireImmediately? = false)：监听数组变化，返回一个清理函数用来停止监听。
- clear()：清空数组
- replace(newArr)：用 newArr 替换。
- find(predicate: (item, index, array) => boolean, thisAry?)：等同于 es7 的 find
- findIndex(predicate: (item, index, array) => boolean, thisArg?)：等同于 ES7 的 Array.findIndex
- remove(value)：通过值从数组中移除一个单个的项。如果项被找到并移除的话，返回 true
- observableArray.sort 和 observableArray.reverse 不会改变数组本身，而只是返回一个排序过/反转过的拷贝。在 MobX 5 及以上版本中会出现警告。推荐使用 array.slice().sort() 来替代。

# 在 store 中不使用装饰器

如果在 store 中我们不想使用装饰器，可以使用 decorate 来代替。

```javascript
import { observable, action, computed, decorate } from 'mobx'
import persist from 'mobx-persist'

class AppStore {
  number = 3333
  obj = { num: +new Date() }

  changeNumber = (number) => {
    this.number = number
    // this.obj.num = number
    setTimeout(() => {
      runInAction(() => {
        this.obj.num = number
      })
    }, 200)
  }

  showNumber() {
    return this.number + 3
  }
}

decorate(AppStore, {
  number: observable,
  obj: [persist('object'), observable], // 从右至左应用
  changeNumber: action,
  showNumber: computed,
})
```
