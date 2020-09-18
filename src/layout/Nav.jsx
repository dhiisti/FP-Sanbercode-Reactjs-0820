import { Link } from "react-router-dom";
import React, { useContext } from "react";
import './footer.css';
// import logo from './img/logo.png';
import { UserContext } from '../context/UserContext';
import {AppBar, Toolbar, Button, Grid} from "@material-ui/core"

const Nav = () =>{
  const styleLinkNavbar={
      color: "#F8E9E9",
      textDecoration: "none",
  }

  const [user, setUser] = useContext(UserContext)

  const handleLogout = () =>{
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
      <AppBar position="static" style={{ background: '#394648' }}>
      <Toolbar>
        <Grid
          justify="space-between"
          container 
          // spacing={24}
        >
          <Grid item>
            <Button color="inherit">
              <Link style={styleLinkNavbar} to="/">Home</Link>
            </Button>
            <Button color="inherit">
                <Link style={styleLinkNavbar} to="/edit">Movie Edit</Link>
            </Button>
            <Button color="inherit">
                <Link style={styleLinkNavbar} to="/gedit">Game Edit</Link>
            </Button>
          </Grid>
    
          <Grid item>
            <div>
              {
                user === null && (
                  <>
                    <Button color="inherit">
                      <Link style={styleLinkNavbar} to="/login">Login</Link>  
                    </Button>
                    <Button color="inherit">
                      <Link style={styleLinkNavbar} to="/register">Register</Link>  
                    </Button>
                  </>
                )
              }

              {
                user !== null && (
                  <>
                    <Button color="inherit">
                      {user.name}
                    </Button>
                    <Button onClick={handleLogout} color="inherit">
                      Logout
                    </Button>
                  </>
                )
              }
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Nav