import AV, {User} from 'leancloud-storage'

AV.init({
  appId: "4xqXgBzkrpNvWsdsEo9Lwasf-gzGzoHsz",
  appKey: "z7SmWEG9lffnyDP8mMWGTwkE",
  serverURL: "https://4xqxgbzk.lc-cn-n1-shared.com"
});
console.log('start...')

const Auth = {
  //注册
  register(username, password) {
    let user = new User()
    user.setUsername(username)
    user.setPassword(password)
    return new Promise((resolve, reject) => {
      user.signUp().then(loginedUser => resolve(loginedUser), error => reject(error)
      )
    })
  },
  //登录
  login(username, password) {
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then(loginedUser => resolve(loginedUser), error => reject(error)
      );
    })
  },
  //注销
  logout() {
    User.logOut()
  },
  //获取用户信息
  getCurrentUser() {
    return User.current();
  }
}
const Uploader = {
  addFile(file, filename) {
    const item = new AV.Object('Image');
    const avFile = new AV.File(filename, file)
    item.set('filename', filename)
    item.set('owner', AV.User.current())
    item.set('url', avFile)
    return new Promise((resolve, reject) => {
      item.save().then(serverFile => {
        resolve(serverFile)
      }, error => {
        reject(error)
      })
    })
  }
}

export {Auth,Uploader}