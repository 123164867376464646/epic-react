import React from 'react';
import {MyList} from '../components/MyList'
import styled from "styled-components";

const Wrapper = styled.div`
  color: #d9d9d9;
  background-color: #4b46465e;
  padding: 20px 100px;
`
function History() {
  return (
    <Wrapper>
      <MyList/>
    </Wrapper>
  );
}

export default History;