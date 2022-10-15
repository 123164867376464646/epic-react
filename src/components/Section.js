import React from 'react'
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(NavLink)`
  border-bottom: inherit;
`
const Wrapper = styled.section`
  font-size: 22px;
  color: white;
  padding: 40px 100px;
  text-align: center;
`
const H1 = styled.h1`
  color: white;
`
const Section = () => {
  return (
    <Wrapper>
      <H1>免费图片上传</H1>
      <p>
        记忆图床-高速稳定的图片上传和管理服务
        <br/>
        支持原图保存,多种图片格式，最大单张支持10M
        <br/>
        请遵守中国法律法规，禁止上传暴力/色情等<StyledLink to="/about">违法</StyledLink>图片
      </p>
    </Wrapper>
  )
}
export {Section}