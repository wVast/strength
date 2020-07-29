import React from 'react'
import ReactDOM from 'react-dom'

import { testFunction } from './common'

import styles from './index.scss'

const TestComponent = () => {
  testFunction('index')

  return (
    <div className={styles.box}>
      <div className={styles.text}>index component</div>
      <img src="../static/image.png" />
    </div>
  )
}

ReactDOM.render(<TestComponent />, document.getElementById('app'))
