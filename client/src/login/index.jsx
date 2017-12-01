import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router';
import { observer, inject } from 'mobx-react'

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import facebookImg from './../assets/images/facebook-icon.png'
import googleImg from './../assets/images/google-icon.png'
import manTelescopeImg from './../assets/images/man-telescope.png'
import './style.scss'

@inject('loginStore')
@observer
export default class Login extends React.PureComponent {
  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.responseFacebook = this.responseFacebook.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
    this.state = {
      email: '',
      password: '',
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.loginStore.login(this.state, (isSuccess) => {
      if (isSuccess) {
        this.props.history.replace('/profile');
      }
    })
  }

  responseFacebook(response) {
    console.log("facebook login: ", response);
  }

  responseGoogle(response) {
    this.setState({name: response.profileObj.name})
    this.setState({email: response.profileObj.email})

    this.props.loginStore.loginSocial(this.state, (isSuccess) => {
      if (isSuccess) {
        this.props.history.replace('/profile');
      }
    })
  }

  render() {
    const { email, password } = this.state
    const { busy, submitted, error, isSuccess } = this.props.loginStore

    let infobox = null

    if (submitted) {
      infobox = (
        <div className={`Infobox ${isSuccess ? 'success' : 'error'}`}>
          <h3>
            {isSuccess ? 'Success!' : error}
          </h3>
        </div>
      )
    }

    return (
      <div className="Login">
        <div>
          <div className="Container-Form">
            {infobox}
            <h1>
              Log In
            </h1>
            <h2>
              Need a account? Create an account
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
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.onChange}
                  placeholder="Password"
                  required={true}
                />

                <input
                  className="btn-submit"
                  type="submit"
                  value={busy ? 'Logging In...' : 'Log In'}
                  disabled={!email || !password}
                />
              </form>

              <div className="Container-Social-Login">
                <h3>
                  or
                </h3>

                <a href="">

                  <FacebookLogin
                    appId="123970931653938"
                    fields="name,email,picture"
                    /* autoLoad={true} */
                    callback={this.responseFacebook}
                    /* reAuthenticate={true} */
                    cssClass="btn-facebook-login"
                    textButton=""
                    icon="fa fa-facebook"
                  />

                  <GoogleLogin
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText=""
                    className="btn-google-login"
                    onSuccess={this.responseGoogle}
                  >
                    <img src={googleImg} height={40} alt="btc-donate" />
                  </GoogleLogin>

                </a>
                <a href="/forgotPassword">
                  Forgot password?
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
