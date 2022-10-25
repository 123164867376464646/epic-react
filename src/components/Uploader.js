import React, {useRef} from "react";
import {useStores} from "../stores";
import {observer, useLocalStore} from "mobx-react";
import {InboxOutlined} from '@ant-design/icons';
import {Upload, message, Spin} from 'antd';
import styled from "styled-components";

const {Dragger} = Upload;

const Result = styled.div`
  height: 400px;
  overflow: scroll;
  background-color: #7a7a7a47;
  color: white;
  margin-top: 30px;
  border: 1px solid #ccc;
  padding: 20px;

  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
`
const H1 = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 8px;
`
const Image = styled.img`
  max-width: 200px;
`

export const Uploader = observer(() => {
  const {ImageStore, UserStore} = useStores()
  const widthRef = useRef()
  const heightRef = useRef()
  const divRef = useRef()
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
      if (file.size > 10 * 1024 * 1024) {
        message.error('图片最大10M')
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
  const autoScroll = () => {
    divRef.current.scrollTop = divRef.current.scrollHeight
  }

  return (
    <>
      <Spin tip='上传中' spinning={ImageStore.isUploading}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域以进行上传图片</p>
          <p className="ant-upload-hint">
            仅支持.svg/.webp/.png/.jpg/.jpeg/.gif格式的图片，图片最大10M
          </p>
        </Dragger>
      </Spin>
      {
        ImageStore.serverFile ? <Result ref={divRef}>
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
            <dt>尺寸定制(单位:px)</dt>
            <dd>
              <input onClick={autoScroll} onChange={bindWidthChange} placeholder='最大宽度（可选）' ref={widthRef}
                     style={{color: '#333'}}/>
              <input onClick={autoScroll} onChange={bindHeightChange} placeholder='最大高度（可选）' ref={heightRef}
                     style={{color: '#333'}}/>
            </dd>
            <dd>
              <a target='_blank' rel="noopener noreferrer" href={store.fullStr}>{store.fullStr}</a>
            </dd>
          </dl>
        </Result> : null
      }
    </>
  )
})