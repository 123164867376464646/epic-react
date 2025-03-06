import React, {useEffect, useState} from 'react'
import {observer} from "mobx-react";
import {useStores} from "../stores";
import InfiniteScroll from 'react-infinite-scroll-component';
import {List, Spin, Skeleton, Divider} from 'antd'
import styled from "styled-components";
import dayjs from "dayjs";

export const MyList = observer(() => {
  const {HistoryStore} = useStores()
  const [zoomState, setZoomState] = useState({ id: null, url: '', animating: false })
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = () => {
    HistoryStore.find()
  }
  useEffect(() => {
    fetchData()
    return () => {
      HistoryStore.reset()
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (zoomState.id) {
        handleImageClick(zoomState)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [zoomState])

  const Img = styled.img`
    width: 100%;
    max-width: auto;
    height: ${props => props.$isZoomed ? '90vw' : '100px'};
    object-fit: cover;
    cursor: zoom-in;
    transition: all 0.3s ease;
    
    @media (max-width: 480px) {
      max-width: 150px;
    }

    &[data-zoomed="true"] {
      position: fixed;
      z-index: 1000;
      max-width: min(90vw, 1920px);
      max-height: 90vh;
      width: auto;
      height: auto;
      object-fit: contain;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1);
      cursor: zoom-out;
      box-shadow: 0 0 40px rgba(0,0,0,0.2);
      background: rgba(255,255,255,0.95);
      border-radius: 4px;
      animation: zoomIn 0.3s ease forwards;
    }

    &.zoom-out {
      animation: zoomOut 0.3s ease forwards;
    }

    @keyframes zoomIn {
      from {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0;
      }
      to {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }

    @keyframes zoomOut {
      from {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
      to {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0;
      }
    }
  `

  const ListItem = styled(List.Item)`
    padding: 16px 0 !important;
    flex-direction: column;
    align-items: flex-start;
  `

  const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    z-index: 999;
    display: ${props => props.visible ? 'block' : 'none'};
    animation: fadeIn 0.3s;
    backdrop-filter: blur(8px);
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `

  const handleImageClick = (item) => {
    if (zoomState.animating) return;

    if (zoomState.id === item.id) {
      setZoomState(prev => ({ ...prev, animating: true }))
      setTimeout(() => {
        setZoomState({ id: null, url: '', animating: false })
      }, 300)
    } else {
      setZoomState({
        id: item.id,
        url: item.attributes.url.attributes.url,
        animating: false
      })
    }
  }

  return (
    <div>
      <Overlay visible={!!zoomState.id} onClick={() => setZoomState({ id: null, url: '', animating: false })} />
      
      {zoomState.url && (
        <img
          src={zoomState.url}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '90vw',
            maxHeight: '90vh',
            zIndex: 1001,
            display: 'none'
          }}
          onLoad={() => {
            setIsLoading(false)
            setZoomState(prev => ({ ...prev, ready: true }))
          }}
          alt="preload"
        />
      )}
      
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1002,
          color: 'white'
        }}>
          <Spin tip="加载原图中..." />
        </div>
      )}
      
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
                  <Img 
                    src={item.attributes.url.attributes.url} 
                    alt={item.filename} 
                    $isZoomed={zoomState.id === item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageClick(item);
                    }}
                    data-zoomed={zoomState.id === item.id}
                    className={zoomState.id === item.id && zoomState.animating ? 'zoom-out' : ''}
                    style={{
                      ...(zoomState.id !== item.id && { height: '100px' }),
                      maxHeight: '90vh'
                    }}
                  />
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
