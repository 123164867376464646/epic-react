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
    width: 100%;
    max-width: 200px;
    height: auto;
    
    @media (max-width: 480px) {
      max-width: 150px;
    }
  `

  const ListItem = styled(List.Item)`
    padding: 16px 0 !important;
    flex-direction: column;
    align-items: flex-start;
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
              <ListItem key={item.id}>
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
              </ListItem>) : null
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
