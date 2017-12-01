import { observable, action } from 'mobx'
import config from '../config'

class ProfileStore {
  @observable busy = false
  @observable submitted = false
  @observable error = null

  @action updateProfile(data) {
    this.busy = true

    fetch(`${config.apiURL}/user/updateProfile`, {
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

  @action changePassword(data) {
    this.busy = true

    fetch(`${config.apiURL}/user/changePassword`, {
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

export default new ProfileStore()

