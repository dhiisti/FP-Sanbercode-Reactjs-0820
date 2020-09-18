import React, {Component} from "react"
import MovieHome from './MovieHome'
import GameHome from './GameHome'

class Home extends Component {

  render(){
    return (
      <div>
        <MovieHome/>
        <GameHome/>
      </div>
    )
  }
}

export default Home
