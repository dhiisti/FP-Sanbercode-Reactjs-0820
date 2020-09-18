import React, {useContext} from "react";
import { Switch, Route, Redirect, Router} from "react-router-dom";

import Home from '../pages/Home/Home';
import MovieSider from '../pages/Movie/MovieSider';
import GameSider from '../pages/Game/GameSider';
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Register';
import ChangePass from '../pages/Login/ChangePass';
import Detail from '../pages/Home/MoviesDetail'
import GameDetail from '../pages/Home/GamesDetail'
import {UserContext} from "../context/UserContext";
import history from '../context/History';

const Section = () =>{

  const [user] = useContext(UserContext);

  const PrivateRoute = ({user, ...props }) => {
    if (user) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({user, ...props }) =>
  user ? <Redirect to="/" /> : <Route {...props} />;

  return(    
      <Switch>
        <Route exact path="/" user={user} component={Home}/>
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/gdetail/:id" component={GameDetail} />
        <Route exact path="/edit" user={user} component={MovieSider}/>
        <Route exact path="/gedit" user={user} component={GameSider}/>
        <Route exact path="/login" user={user} component={Login}/>
        <Route exact path="/register" user={user} component={Register}/>
        <Route exact path="/changepass" user={user} component={ChangePass}/>
        {/* <Route exact path="/movieedit" component={MovieEdit}/> */}
        {/* <PrivateRoute exact path="/movies" user={user} component={MovieEdit}/> */}
      </Switch>
  )
}

export default Section
