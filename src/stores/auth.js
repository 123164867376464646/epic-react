import {observable, action} from 'mobx';
import {Auth} from '../models';
import UserStore from './user'
import ImageStore from './image'
import HistoryStore from "./history";

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
          UserStore.pullUser()
          resolve(user)
        })
        .catch(error => {
          UserStore.resetUser()
          reject(error)
        })
    })
  }

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password)
        .then(user => {
          UserStore.pullUser()
          resolve(user)
        })
        .catch(error => {
          UserStore.resetUser()
          reject(error)
        })
    })
  }

  @action logout() {
    Auth.logout()
    UserStore.resetUser()
    ImageStore.resetFile()
    HistoryStore.reset()
  }

}


export default new AuthStore();
