import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'mobx-react'
import { create } from 'mobx-persist'

import App from './app'
import statStore from './app/stores/stat'
import userStore from './app/stores/user'
import intervalStore from './app/stores/interval'
import contactStore from './contact/store'
import loginStore from './login/store'
import signupStore from './signup/store'
import forgotPasswordStore from './forgotPassword/store'
import resetPasswordStore from './resetPassword/store'
import profileStore from './profile/store'

const stores = {
  userStore,
  statStore,
  intervalStore,
  contactStore,
  loginStore,
  signupStore,
  forgotPasswordStore,
  resetPasswordStore,
  profileStore
}

const hydrate = create({})

hydrate('login', loginStore)
  .then(() => {
    render(
      <AppContainer>
        <Provider {...stores}>
          <App />
        </Provider>
      </AppContainer>,
      document.getElementById('app')
    )
  })

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default

    render(
      <AppContainer>
        <Provider {...stores}>
          <NextApp />
        </Provider>
      </AppContainer>,
      document.getElementById('app')
    )
  })
}

