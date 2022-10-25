import React, {Suspense, lazy} from 'react';
import './App.css';
import background from "./img/background.png";
import styled from 'styled-components'
import Header from './components/Header';
import Footer from './components/Footer';
import {Spin} from 'antd'

import {
  Switch,
  Route
} from 'react-router-dom';

// import Home from './pages/Home';
// import History from './pages/History';
// import About from './pages/About';

const Home = lazy(() => import('./pages/Home'));
const History = lazy(() => import('./pages/History'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const Wrapper = styled.div`
  background-image: url(${background});
  background-attachment:fixed;
  background-repeat: no-repeat;
  background-size:cover;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
`
const Main = styled.main`
  flex: 1;
`

function App() {
  return (
    <Wrapper>
      <Header/>
      <Main>
        <Suspense fallback={<Spin/>}>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/history" component={History}/>
            <Route path="/about" component={About}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
          </Switch>
        </Suspense>
      </Main>
      <Footer/>
    </Wrapper>
  );
}

export default App;
