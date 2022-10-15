import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
  color: #d9d9d9;
  background-color: #4b46465e;
  padding: 20px 100px;
`

function About() {
  return (
    <Wrapper>
      <h1>About Me</h1>
      <p>路过图床成立于2022年,提供高速稳定的图片上传和管理服务.</p>
      <p>优势:</p>
      <ul>
        <li>免费，无需付费即可登录享受服务.</li>
        <li>支持.png/.jpg/.jpeg/.gif等多种格式的图片.</li>
        <li>最大支持10M的图片.</li>
        <li>除违规图片之外, 不会删除图片, 即使是多年无任何流量的图片也不会删除.</li>
      </ul>
      <h1>服务条款</h1>
      <h3 style={{color:'red'}}>禁止上传以下违法违规图片, 一经发现, 立即删除该用户下所有图片, 并永久封账号和IP!</h3>
      <ul>
        <li>含有淫秽色情或低俗內容的图片;</li>
        <li>含有成人性用品的相关图片;</li>
        <li>含有煽动暴力、极端宗教、种族主义、种族仇恨等图片;</li>
        <li>含有恐怖、血腥场面的图片;</li>
        <li><font color="red">含有VPN相关信息的图片;</font></li>
        <li><font color="red">未经授权的电影、电视剧等视频截图或封面;</font></li>
        <li>含有非法网站水印标记的图片;</li>
        <li>其他非法图片(包括但不限于反动、博彩、电脑病毒、欺诈、黑产、非法药品等行为);</li>
        <li>违反中国、美国、加拿大、欧盟、新加坡、台湾、香港等国家或地区法律法规的图片;</li>
      </ul>
    </Wrapper>
  );
}

export default About;