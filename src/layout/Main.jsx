import React from "react"
import { BrowserRouter as Router } from "react-router-dom";

import Nav from "./Nav"
import Section from './Route'
import Footer from "./Footer"


const Main = () =>{
  return(
    <>
      <Router>        
        <Nav/>
        <Section/>
        {/* <Footer/> */}
      </Router>
    </>
  )
}

export default Main
