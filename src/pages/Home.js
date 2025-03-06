import React from 'react';
import {observer} from "mobx-react";
import {Uploader} from "../components/Uploader";
import {Tips} from "../components/Tips";
import {Section} from "../components/Section";
import {useStores} from "../stores";
import styled from 'styled-components';

const StyledSection = styled.section`
  padding: 60px 100px;
  @media (max-width: 768px) {
    padding: 30px 20px;
    font-size: 16px;
  }
  
  h1 {
    @media (max-width: 480px) {
      font-size: 1.8rem;
    }
  }
`;

const Home = observer(() => {

  const {ImageStore} = useStores()
  return (
    <>
      <Tips>请先登录！！！</Tips>
      <Uploader/>
      {!ImageStore.serverFile?<StyledSection/>:null}
    </>
  );
})

export default Home;