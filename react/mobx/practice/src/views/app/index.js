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
