import React, {useRef} from "react";
import {useStores} from "../stores";
import {observer, useLocalStore} from "mobx-react";
import {InboxOutlined} from '@ant-design/icons';
import {Upload, message, Spin} from 'antd';
import styled from "styled-components";

const {Dragger} = Upload;

const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
`
const H1 = styled.h1`
  margin: 20px 0;
  text-align: center;
`
const Image = styled.img`
  max-width: 300px;
`

export const Uploader = observer(() => {
  const {ImageStore, UserStore} = useStores()
  const widthRef = useRef()
  const heightRef = useRef()
  const store = useLocalStore(() => ({
    width: null,
    setWidth(width) {
      store.width = width
    },
    get widthStr() {
      return store.width ? `/w/${store.width}` : ''
    },
    height: null,
    setHeight(height) {
      store.height = height
    },
    get heightStr() {
      return store.height ? `/h/${store.height}` : ''
    },
    get fullStr() {
      return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + this.widthStr + this.heightStr
    }
  }))

  const props = {
    showUploadList: false,
    beforeUpload: file => {
      ImageStore.setFilename(file.name)
      ImageStore.setFile(file)
      if (UserStore.currentUser === null) {
        message.warning('请先登录再上传！')
        return false
      }
      if (!/(svg$)|(webp$)|(png$)|(jpg$)|(jpeg$)|(gif$)/ig.test(file.type)) {
        message.error('只能上传svg/webp/png/jpg/jpeg/gif格式的图片 ')
        return false
      }
      if (file.size > 1024 * 1024) {
        message.error('图片最大1M')
        return false
      }
      ImageStore.upload()
        .then((serverFile) => {
          console.log(serverFile)
        }).catch((err) => {
        console.error(err)
      })
      return false
    }
  }
  const bindWidthChange = () => {
    store.setWidth(widthRef.current.value)
  }
  const bindHeightChange = () => {
    store.setHeight(heightRef.current.value)
  }

  return (
    <div>
      <Spin tip='上传中' spinning={ImageStore.isUploading}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域以进行上传图片</p>
          <p className="ant-upload-hint">
            仅支持.svg/.webp/.png/.jpg/.jpeg/.gif格式的图片，图片最大1M
          </p>
        </Dragger>
      </Spin>
      {
        ImageStore.serverFile ? <Result>
          <H1>上传结果</H1>
          <dl>
            <dt>线上地址</dt>
            <dd><a target='_blank' rel="noopener noreferrer"
                   href={ImageStore.serverFile.attributes.url.attributes.url}>{ImageStore.serverFile.attributes.url.attributes.url}</a>
            </dd>
            <dt>文件名</dt>
            <dd>{ImageStore.filename}</dd>
            <dt>图片预览</dt>
            <dd>
              <Image src={ImageStore.serverFile.attributes.url.attributes.url} alt={ImageStore.filename}/>
            </dd>
            <dt>尺寸定制</dt>
            <dd>
              <input onChange={bindWidthChange} placeholder='最大宽度（可选）' ref={widthRef}/>
              <input onChange={bindHeightChange} placeholder='最大高度（可选）' ref={heightRef}/>
            </dd>
            <dd>
              <a target='_blank' rel="noopener noreferrer" href={store.fullStr}>{store.fullStr}</a>
            </dd>
          </dl>
        </Result> : null
      }
    </div>
  )
})