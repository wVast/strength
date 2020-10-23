import React from 'react'
import { observer, inject } from 'mobx-react'

const App = (props) => {
  const { appStore } = props
  const { price, modifyNumber, total } = appStore

  console.log('total：', total)

  return (
    <div
      onClick={() => {
        modifyNumber(price + 1)
      }}
    >
      {price}
    </div>
  )
}

export default inject('appStore')(observer(App))
