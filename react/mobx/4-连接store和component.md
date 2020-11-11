mobx 和 react 的连接主要依靠单独的 mobx-react 库。

# observer

observer 通过 mobx.autorun 包装了组件的 render 函数，使组件变成了响应式组件，确保组中的数据变化可以强制触发渲染。

```javascript
import React from 'react'
import { observer, inject } from 'mobx-react'

const App = (props) => {
  const { appStore } = props
  const { changeNumber, showNumber } = appStore

  return (
    <div
      onClick={() => {
        changeNumber(+new Date())
      }}
    >
      {showNumber}
    </div>
  )
}

export default inject('appStore')(observer(App))
```

**observer 必须是第一个被应用的装饰器**

# provider 组件

Provider 组件，使用了 React 的上下文 context，可以用来向下传递 stores。

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'

import App from './views/app'

import stores from './store'

configure({
  enforceActions: true,
})

ReactDOM.render(
  <>
    <Provider {...stores}>
      <App />
    </Provider>
  </>,
  document.getElementById('root')
)
```

# inject

Provider 将 store 作为 context 向下传递，inject 则接收一个子 store 的名称列表，将子 store 变成组件的 props。
