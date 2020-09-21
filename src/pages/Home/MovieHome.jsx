import React, {Component} from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { Card, Button, Row, Col, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import './Home.css'

const { Meta } = Card;

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      movies: []
    }
  }

  componentDidMount(){
    axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
    .then(res => {
      let movies = res.data.map(el=>{ return {
        id: el.id, 
        title: el.title, 
        rating: el.rating,
        genre: el.genre,
        year: el.year,
        image_url: el.image_url
      }})
      this.setState({movies})
    })
  }

  render(){
    return (
      <div className="container">
        <h1>Daftar Film Terbaik</h1>
          {/* <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." /> */}
        <Row gutter={[16, 24]} >
          {
            this.state.movies.map((item)=>{
              return(
                  <Col span={6}>
                    <Card
                        hoverable
                        style={{ width: 260, height: 580, backgroundColor:"#EAF4D3", borderRadius: "20px" }}
                        cover={<img alt="example" src={item.image_url} style={{ width: 260, height: 400, objectFit: "cover", borderRadius: "20px 20px 0 0 "}}/>}
                    >
                        <Meta 
                        title={item.title} 
                        description={
                            <div className="info">
                                <strong>Rating : {item.rating}</strong><br/>
                                <strong>Genre : {item.genre}</strong><br/>
                                <strong>Year : {item.year}</strong><br/>
                                <Button type="primary" style={{ borderRadius: "20px", marginTop: "10px", background: '#394648', border: "none"}}><Link to={`/detail/${item.id}`}>Detail</Link></Button>
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

export default Home
