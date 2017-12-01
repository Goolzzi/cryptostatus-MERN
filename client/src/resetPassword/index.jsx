import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router';
import { observer, inject } from 'mobx-react'

import './style.scss'

@inject('resetPasswordStore')
@observer
export default class ResetPassword extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      newPassword: '',
      confirmPassword: '',
      token: props.match.params.token
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.resetPasswordStore.resetPassword(this.state, (isSuccess) => {
    })
  }

  render() {
    const { newPassword, confirmPassword, token } = this.state
    const { busy, submitted, error, isSuccess } = this.props.resetPasswordStore

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
      <div className="ResetPassword">
        <div>
          <div className="Container-Form">
            {infobox}
            <h1>
              Reset Your Password
            </h1>
            <h2>
              Almost done. Enter your password, and you're good to go.
            </h2>

            <div>
              <form onSubmit={this.onSubmit}>

                <input
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={this.onChange}
                  placeholder="New Password"
                  required={true}
                />

                <input
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={this.onChange}
                  placeholder="Confirm New Password"
                  required={true}
                />

                <input
                  className="btn-submit"
                  type="submit"
                  value={busy ? 'Sending...' : 'Reset Password'}
                  disabled={!newPassword || !confirmPassword}
                />
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
