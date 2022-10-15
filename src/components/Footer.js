import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  background-color: rgba(2, 16, 31,0.3);
  padding: 10px 100px;
  text-align: center;
  font-size: 12px;
  color: #aaa;
`;
const year = new Date().getFullYear();

function Component() {
  return (
    <Footer>
      <div>Copyright &copy; {year} <a href="https://linmumujiayou.gitee.io/epic-react">记忆图床</a> All rights reserved.</div>
    </Footer>
  );
}

export default Component;