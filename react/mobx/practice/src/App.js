import React, { useEffect } from 'react'
import { observer, inject } from 'mobx-react'

const App = (props) => {
  const { AppStore } = props
  let { total, price } = AppStore

  console.log(total)

  useEffect(() => {
    price = 12
  }, [])

  return <div>{price}</div>
}

export default inject('AppStore')(observer(App))
