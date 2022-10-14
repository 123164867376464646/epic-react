import {observable, action} from 'mobx';
import {Uploader} from '../models';

class ImageStore {
  @observable filename = ""
  @observable file = null
  @observable isUploading = false
  @observable serverFile = null

  @action setFilename(newFilename) {
    this.filename = newFilename
  }

  @action setFile(newFile) {
    this.file = newFile
  }

  @action upload() {
    this.isUploading = true
    this.resetFile()
    return new Promise((resolve, reject) => {
      Uploader.addFile(this.file, this.filename)
        .then(serverFile => {
          this.serverFile = serverFile
          resolve(serverFile)
        }).catch(error => {
        reject(error)
      }).finally(() => {
        this.isUploading = false
      })
    })
  }
  @action resetFile(){
    this.isUploading = false
    this.serverFile = null
  }
}


export default new ImageStore();
