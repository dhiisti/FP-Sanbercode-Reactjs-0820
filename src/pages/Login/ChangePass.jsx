import React, { useContext, useState } from "react"
import {UserContext} from '../../context/UserContext'
import axios from "axios"
import {useHistory} from "react-router-dom"
import { Input } from 'antd';

const ChangePass = () =>{
//   let history = useHistory()
  const [user, setUser] = useContext(UserContext)
  const [input, setInput] = useState({'current_password': "" , 'new_password': "", 'new_confirm_password': ""})


  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    console.log(name)
    console.log(value)
    switch (name){
      case "current_password":{
        setInput({...input, current_password: value})
        break;
      }
      case "new_password":{
        setInput({...input, new_password: value})
        break;
      }
      case "new_confirm_password":{
        setInput({...input, new_confirm_password: value})
        break;
      }
      default:{break;}
    }
  }

  const handleChangePass= (event) =>{
    event.preventDefault()
    let data = {
      'current_password': input.current_password,
      'new_password': input.new_password,
      'new_confirm_password': input.new_confirm_password
    }
    console.log(data)
    axios.post("https://backendexample.sanbersy.com/api/change-password", {...data}, {headers: {"Authorization" : `Bearer ${user.token}`}}
    ).then(res => {
      alert('berhasil')
    }).catch(err =>{
      console.log(err)
      alert(err)
    })

  }

  return(
    <div style={{background: "#EAF4D3", width: "60%", margin: "50px auto", borderRadius: "20px", padding: "20px"}}>
        <form onSubmit={handleChangePass} style={{alignItems: "center"}}>
          <label>Current Password: </label>
          <Input required type="text" name="current_password" onChange={handleChange} value={input.current_password} style={{width: "50%"}} placeholder="Current Password" />
          {/* <input type="text" name="current_password" onChange={handleChange} value={input.current_password}/> */}
          <br/>
          <label>New Password: </label>
          <Input required type="text" name="new_password" onChange={handleChange} value={input.new_password} style={{width: "50%"}} placeholder="Current Password" />
          {/* <input type="text" name="new_password" onChange={handleChange} value={input.new_password}/> */}
          <br/>
          <label>Confirm New Password: </label>
          <Input required type="text" name="new_confirm_password" onChange={handleChange} value={input.new_confirm_password} style={{width: "50%"}} placeholder="Current Password" />
          {/* <input type="text" name="new_confirm_password" onChange={handleChange} value={input.new_confirm_password}/> */}
          <br/>
          <button style={{width: "50%"}}>Change Password</button>
        </form>
    </div>
  )
}

export default ChangePass
