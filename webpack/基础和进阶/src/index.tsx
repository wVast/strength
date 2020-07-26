import React from 'react'
import ReactDOM from 'react-dom'

import { testFunction } from './common'

import styles from './index.scss'

const TestComponent = () => {
  testFunction('index')

  return (
    <div className={styles.box}>
      <div className={styles.text}>index component</div>
      <img src="https://lh3.googleusercontent.com/proxy/Bn7_vCExQzhzhuO-3hdm8pvfiD5Zu87iiyKSQ9NFdBpaV6D4k4yiMgYHgfRNEc_NMSBqAZikXEU7c73-hviDNE1GgYW8rXJ4QflMXVzD7gg0SE4-ovWYJZvt9fu_FvBsz2IdmC0i2FtX3HRHNlw1FVMJGG4" />
    </div>
  )
}

ReactDOM.render(<TestComponent />, document.getElementById('app'))
