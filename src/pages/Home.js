import React, {useEffect} from 'react';
import {observer} from "mobx-react";
import {Uploader} from "../components/Uploader";
import {Tips} from "../components/Tips";
import {Section} from "../components/Section";
import {useStores} from "../stores";

const Home = observer(() => {

  const {ImageStore,UserStore} = useStores()

  useEffect(()=>{
    UserStore.pullUser()
  },[])
  return (
    <>
      <Tips>请先登录！！！</Tips>
      <Uploader/>
      {!ImageStore.serverFile?<Section/>:null}
    </>
  );
})

export default Home;