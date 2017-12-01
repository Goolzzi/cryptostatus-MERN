import React from 'react'
import { observer, inject } from 'mobx-react'

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import facebookImg from './../assets/images/facebook-icon.png'
import googleImg from './../assets/images/google-icon.png'
import manTelescopeImg from './../assets/images/man-telescope.png'
import './style.scss'

@inject('signupStore')
@observer
export default class Signup extends React.PureComponent {
  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.responseFacebook = this.responseFacebook.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.signupStore.send(this.state)
  }

  responseFacebook(response) {
    console.log("facebook login: ", response);
  }

  responseGoogle(response) {
    console.log("google login: ", response.profileObj.name);
    this.setState({name: response.profileObj.name})
    this.setState({email: response.profileObj.email})
    // this.state.name = response.profileObj.name;
    // this.state.email = response.profileObj.email;
  }

  render() {
    const { name, email, password } = this.state
    const { busy, submitted, error } = this.props.signupStore

    let infobox = null

    if (submitted) {
      infobox = (
        <div className={`Infobox ${error != null ? 'error' : 'success'}`}>
          <h3>
            {error != null ? error : 'Success!'}
          </h3>
        </div>
      )
    }

    return (
      <div className="Signup">
        <div>
          <div className="Container-Form">
            {infobox}
            <h1>
              Sign Up
            </h1>
            <h2>
              Lorem ipsum dolor si amet
            </h2>

            <div>
              <form onSubmit={this.onSubmit}>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  placeholder="Name"
                  required={true}
                />

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
                  value={busy ? 'Signing Up...' : 'Sign Up'}
                  disabled={!name || !email || !password}
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
                  Already have an account?
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
