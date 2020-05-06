import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Root from './Root'

ReactDOM.render(
  <Root>
      <App />
  </Root>,
  document.querySelector('#root')
)

// index.js does not get tested 