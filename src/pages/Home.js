import React from 'react';
import {observer} from "mobx-react";
import {Uploader} from "../components/Uploader";
import {Tips} from "../components/Tips";
import {Section} from "../components/Section";

const Home = observer(() => {
  return (
    <>
      <Tips>请先登录！！！</Tips>
      <Uploader/>
      <Section/>
    </>
  );
})

export default Home;