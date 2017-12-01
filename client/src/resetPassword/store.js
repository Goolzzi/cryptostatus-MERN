import { observable, action } from 'mobx'
import config from '../config'

class ResetPasswordStore {
  @observable busy = false
  @observable submitted = false
  @observable error = null
  @observable isSuccess = false

  @action resetPassword(data) {
    this.busy = true

    fetch(`${config.apiURL}/user/resetPassword/`, {
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
      })
      .catch((err) => {
        this.busy = false
        this.submitted = true
        this.error = true
        this.isSuccess = false
      })
  }
}

export default new ResetPasswordStore()

