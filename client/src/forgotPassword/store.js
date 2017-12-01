import { observable, action } from 'mobx'
import config from '../config'

class ForgotPasswordStore {
  @observable busy = false
  @observable submitted = false
  @observable error = false
  @observable isSuccess = false

  @action send(data) {
    this.busy = true

    fetch(`${config.apiURL}/user/forgot`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        console.log(res)
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

export default new ForgotPasswordStore()

