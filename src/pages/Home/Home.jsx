import React, {Component} from "react"
import MovieHome from './MovieHome'
import GameHome from './GameHome'
import { BackTop } from 'antd';
import { UpOutlined} from '@ant-design/icons';

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 50,
  backgroundColor: '#394648',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
  
};

class Home extends Component {
  
  render(){
    return (
      <div>
        <MovieHome/>
        <GameHome/>
        <BackTop>
          <div style={style}><UpOutlined /></div>
        </BackTop>
      </div>
    )
  }
}

export default Home
