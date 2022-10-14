import React, {useEffect} from 'react'
import {observer} from "mobx-react";
import {useStores} from "../stores";
import InfiniteScroll from 'react-infinite-scroll-component';
import {List, Spin, Skeleton, Divider} from 'antd'

export const MyList = observer(() => {

  const {HistoryStore} = useStores()
  const fetchData = () => {
    HistoryStore.find()
  }
  useEffect(() => {
    fetchData()
  }, [])
  console.log(HistoryStore.list)
  console.log(HistoryStore.list.map(i=>i.attributes))
  console.log(HistoryStore.list.map(i=>i.attributes.url))
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
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={HistoryStore.list}
          renderItem={
            item =>item.attributes.url?(
              <List.Item key={item.id}>
                <div>
                <img src={item.attributes.url.attributes.url} alt={item.filename} style={{height:'100px'}}/>
                </div>
                <div>
                  <h5>{item.attributes.filename}</h5>
                </div>
                <div>
                  <a href={item.attributes.url.attributes.url}>item.attributes.url.attributes.url</a>
                </div>
              </List.Item>):null
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
