import React from 'react'
import ReactDOM from 'react-dom'
import DevTools from 'mobx-react-devtools'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'

import App from './views/app'

import stores from './store'

configure({
  enforceActions: true,
})

ReactDOM.render(
  <>
    {/* <DevTools /> */}
    <Provider {...stores}>
      <App />
    </Provider>
  </>,
  document.getElementById('root')
)
