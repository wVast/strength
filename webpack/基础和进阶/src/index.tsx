import React from 'react'
import ReactDOM from 'react-dom'

import { testFunction } from './common'

const TestComponent = () => {
  testFunction('index')

  return <div>TestComponent</div>
}

ReactDOM.render(TestComponent, document.getElementById('app'))
