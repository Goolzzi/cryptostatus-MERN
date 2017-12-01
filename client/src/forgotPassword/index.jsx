import React from 'react'
import { observer, inject } from 'mobx-react'

import facebookImg from './../assets/images/facebook-icon.png'
import googleImg from './../assets/images/google-icon.png'
import manTelescopeImg from './../assets/images/man-telescope.png'
import './style.scss'

@inject('forgotPasswordStore')
@observer
export default class ForgotPassword extends React.PureComponent {
  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      email: '',
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.forgotPasswordStore.send(this.state)
  }

  render() {
    const { email } = this.state
    const { busy, submitted, error, isSuccess } = this.props.forgotPasswordStore

    let infobox = null

    if (submitted) {
      infobox = (
        <div className={`Infobox ${isSuccess ? 'success' : 'error'}`}>
          <h3>
          {isSuccess ? 'We sent you an email to reset your password!' : error}
          </h3>
        </div>
      )
    }

    return (
      <div className="ForgotPassword">
        <div>
          <div className="Container-Form">
            {infobox}
            <h1>
              Reset Your Password
            </h1> 
            <h2>
              We'll email you instructions to reset your password.
            </h2>

            <div>
              <form onSubmit={this.onSubmit}>

                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  placeholder="E-mail"
                  required={true}
                />

                <input
                  className="btn-submit"
                  type="submit"
                  value={busy ? 'Sending...' : 'Reset Password'}
                  disabled={!email}
                />
              </form>

              <div className="container-return-login">
                <a href="/login">
                  Return to login
                </a>
              </div>

            </div>
          </div>
        </div>
        <div>
          <div className="Container-Tutor">
            <h1>
              NEVER MISS A CRYPTO TREND AGAIN!
            </h1> 
            <h2>
              Choose from variety of time intervals, compare price and volume percent changes and ride the wave of crytocoin trends!
            </h2>
            <img src={manTelescopeImg} height={40} alt="btc-donate" />
          </div>
        </div>
      </div>
    )
  }
}
