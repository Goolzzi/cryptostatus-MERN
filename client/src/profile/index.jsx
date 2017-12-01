import React from 'react'
import { observer, inject } from 'mobx-react'
// import Phone from 'react-phone-number-input'

import './style.scss'

@inject('profileStore', 'loginStore')
@observer
export default class Profile extends React.PureComponent {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
        this.changePassword = this.changePassword.bind(this)
        const { _id, name, email, phone } = props.loginStore.loginUser
        this.state = {
            _id,
            name,
            email,
            phone,
            currentPassword: '',
            newPassword: '',
            newConfirmPassword: ''
        }
    }

    onChange(e) {
        console.log(e.target.name, e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }

    updateProfile(e) {
        e.preventDefault()
        this.props.profileStore.updateProfile(this.state)
    }

    changePassword(e) {
        e.preventDefault()
        this.props.profileStore.changePassword(this.state)
    }

    render() {
        const { name, email, phone, currentPassword, newPassword, newConfirmPassword } = this.state
        const { busy, submitted, error } = this.props.profileStore

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
            <div className="Profile">
                <div>
                    <div className="Container-Profile">
                        {infobox}
                        <h1>
                            Profile
                        </h1>
                        <h2>
                            Basic Information
                        </h2>

                        <div>
                            <form onSubmit={this.updateProfile}>

                                <div className="row">
                                    <span>Name</span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={this.onChange}
                                        placeholder="Name"
                                        required={true}
                                    />
                                </div>

                                <div className="row">
                                    <span>E-mail</span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={this.onChange}
                                        placeholder="E-mail"
                                        required={true}
                                    />
                                </div>

                                <div className="row">
                                    <span>Phone</span>
                                    <input
                                        name="phone"
                                        type="number"
                                        value={phone}
                                        onChange={this.onChange}
                                        placeholder="Phone"
                                        required={true}
                                    />
                                </div>

                                {/* <Phonoe
                                    name="phone"
                                    value={password}
                                    onChange={this.onChange}
                                    placeholder="Phone number"
                                    required={true}
                                /> */}

                                <div className="row button-wrap">
                                    <input
                                        className="Btn-Update"
                                        type="submit"
                                        value={busy ? 'Signing Up...' : 'Update'}
                                        disabled={!name || !email || !phone}
                                    />
                                    {/* <div className="Container-Success">
                                        <span>Successfully updated.</span>
                                    </div> */}
                                </div>
                            </form>
                        </div>

                        <h2>
                            Change Password
                        </h2>

                        <div>
                            <form onSubmit={this.changePassword}>
                                <div className="row">
                                    <span>Current<br/>Password</span>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={currentPassword}
                                        onChange={this.onChange}
                                        placeholder="Type your password"
                                        required={true}
                                    />
                                </div>

                                <div className="row">
                                    <span>New<br/>Password</span>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={this.onChange}
                                        placeholder="********"
                                        required={true}
                                    />
                                </div>

                                <div className="row">
                                    <span>Confirm New<br/>Password</span>
                                    <input
                                        name="newConfirmPassword"
                                        type="password"
                                        value={newConfirmPassword}
                                        onChange={this.onChange}
                                        placeholder="********"
                                        required={true}
                                    />
                                </div>

                                <div className="row button-wrap">
                                    <input
                                        className="Btn-Update"
                                        type="submit"
                                        value={busy ? 'Signing Up...' : 'Update'}
                                        disabled={!currentPassword || !newPassword || !newConfirmPassword}
                                    />
                                    {/* <div className="Container-Success">
                                        <span>Successfully updated.</span>
                                    </div> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="Container-Membership">
                        <h1>
                            GET PRO MEMBERSHIP
                        </h1>
                        <h2>
                            Unlimited alerts <br/> SMS Notification
                        </h2>

                        <input
                            className="Btn-Pro"
                            type="submit"
                            value={busy ? 'Signing Up...' : 'Get Pro'}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
