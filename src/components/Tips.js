import React from 'react'
import {observer} from "mobx-react";
import {useStores} from "../stores";
import styled from 'styled-components'

const TipsStyle = styled.div`
  background: orange;
  padding: 10px;
  margin: 30px 0;
  color: #fff;
  border-radius: 4px;
`
export const Tips = observer(({children}) => {
  const {UserStore} = useStores()
  return (
    <>
      {UserStore.currentUser ? null : <TipsStyle>{children}</TipsStyle>}
    </>
  )
})