import React from 'react';
import {observer} from "mobx-react";
import {Uploader} from "../components/Uploader";
import {Tips} from "../components/Tips";

const Home = observer(() => {
  return (
    <>
      <Tips>请先登录！！！</Tips>
      <Uploader/>
      <div>111</div>
    </>
  );
})

export default Home;