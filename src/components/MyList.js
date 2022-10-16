import React, {useEffect} from 'react'
import {observer} from "mobx-react";
import {useStores} from "../stores";
import InfiniteScroll from 'react-infinite-scroll-component';
import {List, Spin, Skeleton, Divider} from 'antd'
import styled from "styled-components";
import dayjs from "dayjs";

export const MyList = observer(() => {
  const {HistoryStore} = useStores()
  const fetchData = () => {
    HistoryStore.find()
  }
  useEffect(() => {
    fetchData()
    return () => {
      HistoryStore.reset()
    }
  }, [])

  const Img = styled.img`
    width: 200px;
    height: (1.2*200)px;
    object-fit: contain;
    border: 1px solid #eee
  `
  return (
    <div>
      <InfiniteScroll
        dataLength={HistoryStore.list.length}
        next={fetchData}
        hasMore={HistoryStore.isLoading && HistoryStore.hasMore}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain style={{color: 'white'}}>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={HistoryStore.list}
          renderItem={
            item => item.attributes.url ? (
              <List.Item key={item.id}>
                <div>
                  <Img src={item.attributes.url.attributes.url} alt={item.filename} style={{height: '100px'}}/>
                </div>
                <div>
                  <h5 style={{color:'white'}}>{item.attributes.filename}</h5>
                </div>
                <div>
                  <a href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</a>
                </div>
                <div style={{color:'white'}}>
                  {dayjs(item.createdAt.toISOString()).format('YYYY-MM-DD')}
                </div>
              </List.Item>) : null
          }
        >
          {HistoryStore.isLoading && HistoryStore.hasMore && (
            <div>
              <Spin tip='加载中'/>
            </div>
          )}
        </List>
      </InfiniteScroll>
    </div>
  )
})
