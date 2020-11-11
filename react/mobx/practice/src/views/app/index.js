import React from 'react'
import { observer, inject } from 'mobx-react'

const App = (props) => {
  const { appStore } = props
  const { changeNumber, showNumber, obj, changeNumberTwo } = appStore

  return (
    <div
      onClick={() => {
        changeNumberTwo()
      }}
    >
      {obj.num}
    </div>
  )
}

export default inject('appStore')(observer(App))
