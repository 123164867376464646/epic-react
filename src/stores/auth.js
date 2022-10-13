import {observable, action} from 'mobx';
import {Auth} from '../models';
import userStore from './user'
import imageStore from './image'

class AuthStore {

  @observable values = {
    username: '',
    password: ''
  };

  @action setUsername(username) {
    this.values.username = username;
  }

  @action setPassword(password) {
    this.values.password = password;
  }

  @action login() {
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password)
        .then(user => {
          userStore.pullUser()
          resolve(user)
        })
        .catch(error => {
          userStore.resetUser()
          reject(error)
        })
    })
  }

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password)
        .then(user => {
          userStore.pullUser()
          resolve(user)
        })
        .catch(error => {
          userStore.resetUser()
          reject(error)
        })
    })
  }

  @action logout() {
    Auth.logout()
    userStore.resetUser()
    imageStore.resetFile()
  }

}


export default new AuthStore();
