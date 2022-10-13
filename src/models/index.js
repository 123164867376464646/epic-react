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
  },
  // Uploader.findFile({page:0,limit:10}).then(data=>console.log(data))
  findFile({page = 0, limit = 10}) {
    const query = new AV.Query('Image')
    query.include('owner')
    query.limit(limit)
    query.skip(page * limit)
    query.descending('createdAt')
    query.equalTo('owner', AV.User.current())
    return new Promise((resolve, reject) => {
      query.find()
        .then((results) => {
          resolve(results)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

window.Uploader = Uploader

export {Auth, Uploader}