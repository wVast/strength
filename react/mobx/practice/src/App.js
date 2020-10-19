import React from 'react'
import { observer } from 'mobx-react'

import store from './appStore'

const App = () => {
  const { price } = store

  console.log(price)

  return <div>test</div>
}

export default observer(App)
