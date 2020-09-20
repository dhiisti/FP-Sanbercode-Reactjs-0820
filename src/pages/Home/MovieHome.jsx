import React, {Component} from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { Card, Button, Row, Col, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import './Home.css'

const { Meta } = Card;
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

function minuteToHours(num){
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return ( rhours === 0 ? "" : rhours + " Jam") + (rminutes === 0 ? "" : " " + rminutes + " Menit")
}

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

  // submitForm(event) {
  //   event.preventDefault();
  //       axios
  //         .get(`https://backendexample.sanbersy.com/api/data-movie`)
  //         .then((res) => {
  //           let data = res.data;
  //           this.setState(
  //             data.filter((movie) =>
  //               movie.title.toLowerCase().includes(search.toLowerCase())
  //             )
  //           );
  //         });
  // };

//   handleChange(e) {
//     axios
//           .get(`https://backendexample.sanbersy.com/api/data-movie`)
//           .then((res) => {
//             let data = res.data;
//             let movies = data.filter((movie) => movie.title.toLowerCase().includes(toLowerCase()))
//             this.setState({movies})
//           });
// }

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
