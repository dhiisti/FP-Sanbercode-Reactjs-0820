import React, { useContext, useState } from "react"
import {UserContext} from '../../context/UserContext'
import axios from "axios"
import { Input } from 'antd';

const Register = () =>{
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({name: "", email: "" , password: ""})

  const handleSubmit = (event) =>{
    event.preventDefault()
    axios.post("https://backendexample.sanbersy.com/api/register", {
      name: input.name, 
      email: input.email, 
      password: input.password
    }).then(
      (res)=>{
        var user = res.data.user
        var token = res.data.token
        var currentUser = {name: user.name, email: user.email, token }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
      }
    ).catch((err)=>{
      alert(err)
    })
  }

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "name":{
        setInput({...input, name: value})
        break;
      }
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
          <label>Name: </label>
          {/* <input type="text" name="name" onChange={handleChange} value={input.name}/> */}
          <Input required type="text" name="name" onChange={handleChange} value={input.name} style={{width: "50%"}} placeholder="Email" />
          <br/>
          <label>email: </label>
          <Input required type="email" name="email" onChange={handleChange} value={input.email} style={{width: "50%"}} placeholder="Email" />
          {/* <input type="email" name="email" onChange={handleChange} value={input.email}/> */}
          <br/>
          <label>Password: </label>
          <Input required type="password" name="password" onChange={handleChange} value={input.password} style={{width: "50%"}} placeholder="Email" />
          {/* <input type="password" name="password" onChange={handleChange} value={input.password}/> */}
          <br/>
          <button style={{width: "50%"}}>Register</button>
        </form>
      </div>
    </>
  )
}

export default Register