import { observable, action } from 'mobx'
import config from '../config'

class SignupStore {
  @observable busy = false
  @observable submitted = false
  @observable error = null

  @action send(data) {
    this.busy = true

    fetch(`${config.apiURL}/user/signup`, {
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
      })
      .catch((err) => {
        this.busy = false
        this.submitted = true
        this.error = res.error
      })
  }
}

export default new SignupStore()

