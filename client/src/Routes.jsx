import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './hoc/Layout/Layout';
import Register_Login from './components/Register_Login/Register_Login';
import Register from './components/Register_Login/Register';
import UserDashboard from './components/User/UserDashboard';
import Auth from './hoc/Auth';


const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path = "/user/dashboard" exact component = {Auth(UserDashboard,true)}/>
        <Route path = "/register_login" exact component = {Auth(Register_Login,false)}/>
        <Route path = "/register" exact component = {Auth(Register,false)}/>
        <Route path = "/" exact component = {Auth(Home,null)} />
      </Switch>
    </Layout>

  )
}

export default Routes;
