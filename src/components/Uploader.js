import React, {useRef} from "react";
import {useStores} from "../stores";
import {observer} from "mobx-react";

export const Uploader = observer(() => {
  const {ImageStore} = useStores()
  const refInput = useRef()
  const bindChange = () => {
    console.log(refInput.current)
    if (refInput.current.files.length > 0) {
      ImageStore.setFilename(refInput.current.files[0].name)
      ImageStore.setFile(refInput.current.files[0])
      ImageStore.upload()
        .then((serverFile) => {
          console.log('上传成功')
          console.log(serverFile)

        }).catch((err) => {
        console.error(err)
      })
    }
    window.file = refInput.current
  }
  return (
    <div>
      <h1>文件上传</h1>
      <input type='file' ref={refInput} onChange={bindChange}/>
    </div>
  )
})