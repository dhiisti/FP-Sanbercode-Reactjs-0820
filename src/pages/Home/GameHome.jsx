import React, {Component} from "react"
import axios from "axios"
import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from 'antd';
import './Home.css'
const { Meta } = Card;

class GameHome extends Component {
  constructor(props){
    super(props)
    this.state = {
      games: []
    }
  }

  componentDidMount(){
    axios.get(`https://backendexample.sanbersy.com/api/data-game`)
    .then(res => {
      let games = res.data.map(el=>{ return {
        id: el.id, 
        name: el.name, 
        genre: el.genre, 
        release: el.release,
        singlePlayer: el.singlePlayer,
        multiplayer: el.multiplayer,
        platform: el.platform,
        image_url: el.image_url
      }})
      this.setState({games})
    })
  }

  render(){
    return (
      <div className="container">
        <h1>Daftar Game Terbaik</h1>
        <Row gutter={[5, 5]}>
          {
            this.state.games.map((item)=>{
              return(
                  <Col span={6}>
                    <Card
                        hoverable
                        style={{ width: 260, height: 580, backgroundColor:"#EAF4D3", borderRadius: "20px" }}
                        cover={<img alt="example" src={item.image_url} style={{ width: 260, height: 400, objectFit: "cover",  borderRadius: "20px 20px 0 0"}}/>}
                    >
                        <Meta 
                        title={item.name} 
                        description={
                            <div>
                                <strong>Genre: {item.genre}</strong><br/>
                                <strong>Release: {item.release}</strong><br/>
                                <strong>Platform: {item.platform}</strong><br/>
                                <Button type="primary" style={{ borderRadius: "20px", marginTop: "10px", background: '#394648', border: "none"}}><Link to={`/gdetail/${item.id}`}>Detail</Link></Button>
                            </div> 
                        }/>
                    </Card>
                  </Col>
              )
            })
          }
        </Row>
      </div>
    )
  }
}

export default GameHome
