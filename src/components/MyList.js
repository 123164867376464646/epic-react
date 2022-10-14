import React, {useEffect} from 'react'
import {observer} from "mobx-react";
import {useStores} from "../stores";
import InfiniteScroll from 'react-infinite-scroll-component';
import {List, Spin, Skeleton, Divider} from 'antd'

export const MyList = observer(() => {

  const {HistoryStore} = useStores()
  const fetchData = () => {
   HistoryStore.find()
    console.log(HistoryStore.list);
  }
  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div>
      <InfiniteScroll
        dataLength={HistoryStore.list.length}
        next={fetchData}
        hasMore={HistoryStore.isLoading&&HistoryStore.hasMore}
        loader={
          // <Skeleton
          //   avatar
          //   paragraph={{
          //     rows: 1,
          //   }}
          //   active
          // />
          '加载中'
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={HistoryStore.list}
          renderItem={
            item =>
              <List.Item key={item.id}>
              </List.Item>
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
