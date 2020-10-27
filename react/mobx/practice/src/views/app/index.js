import React from 'react'
import { observer, inject } from 'mobx-react'

const App = (props) => {
  const { appStore } = props
  const { modifyNumber, total } = appStore

  console.log('total：', total)

  return (
    <div
      onClick={() => {
        modifyNumber(+new Date())
      }}
    >
      {total}
    </div>
  )
}

export default inject('appStore')(observer(App))
