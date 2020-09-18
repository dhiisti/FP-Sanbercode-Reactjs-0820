import React, { useContext, useState } from "react"
import {UserContext} from '../../context/UserContext'
import axios from "axios"
import {useHistory} from "react-router-dom"
import { Input } from 'antd';

const Login = () =>{
  let history = useHistory()
  const [user, setUser] = useContext(UserContext)
  const [input, setInput] = useState({email: "" , password: ""})

  const handleSubmit = (event) =>{
    event.preventDefault()
    axios.post("https://backendexample.sanbersy.com/api/user-login", {
      email: input.email, 
      password: input.password
    }).then(
      (res)=>{
        var user = res.data.user
        var token = res.data.token
        var currentUser = {name: user.name, email: user.email, token }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
        history.push("/")
      }
    ).catch((err)=>{
      alert(err)
    })
  }

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "email":{
        setInput({...input, email: value})
        break;
      }
      case "password":{
        setInput({...input, password: value})
        break;
      }
      default:{break;}
    }
  }

  return(
    <>
      <div style={{background: "#EAF4D3", width: "60%", margin: "50px auto", borderRadius: "20px", padding: "20px"}}>
        <form onSubmit={handleSubmit} style={{alignItems: "center"}}>
          <label>Email: </label>
          <Input required type="email" name="email" onChange={handleChange} value={input.email} style={{width: "50%"}} placeholder="Email" />
          {/* <input type="email" name="email" onChange={handleChange} value={input.email}/> */}
          <br/>
          <label>Password: </label>
          <Input required type="password" name="password" onChange={handleChange} value={input.password} style={{width: "50%"}} placeholder="Password" />
          {/* <input type="password" name="password" onChange={handleChange} value={input.password}/> */}
          <br/>
          <button style={{width: "50%"}}>Login</button>
        </form>
      </div>
    </>
  )
}

export default Login
