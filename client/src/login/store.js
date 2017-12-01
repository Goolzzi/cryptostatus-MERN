import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'
import config from '../config'

class UserModel {
  @persist @observable _id = '';
  @persist @observable name = '';
  @persist @observable email = '';
  @persist @observable phone = '';
}

class LoginStore {
  @persist @observable busy = false
  @persist @observable submitted = false
  @persist @observable error = null
  @persist @observable isSuccess = false
  @persist('object', UserModel) @observable loginUser = new UserModel
  
  @action login(data, callback) {
    this.busy = true

    fetch(`${config.apiURL}/user/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        this.busy = false
        this.submitted = true
        this.error = res.error
        this.isSuccess = res.success
        this.loginUser = res.user
        callback(this.isSuccess)
      })
      .catch((err) => {
        this.busy = false
        this.submitted = true
        this.error = res.error
        this.isSuccess = false
        callback(false)
      })
  }

  @action loginSocial(data, callback) {
    this.busy = true

    fetch(`${config.apiURL}/user/login/social`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        this.busy = false
        this.submitted = true
        this.error = res.error
        this.isSuccess = res.success
        this.loginUser = res.user
        callback(this.isSuccess)
      })
      .catch((err) => {
        this.busy = false
        this.submitted = true
        this.error = res.error
        this.isSuccess = false
        callback(false)
      })
  }
}

export default new LoginStore()

