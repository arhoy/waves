import React, { Component } from 'react';
import { auth } from '../actions/user_actions';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';



export default function(ComposedClass,reload, adminRoute = null){
    class Auth extends Component {
        state = {
            isLoading:true
        }

        componentDidMount() {
            this.props.dispatch(auth()).then(response => {
                let user = this.props.user.userData;
                if(!user.isAuth){
                    // reload means that it is private route.
                    if(reload){
                        this.props.history.push('/register_login');
                    }
                }
                else{
                    // admin route and user is not admin, kick them back to user/dashboard
                    if(adminRoute && !user.isAdmin){
                        this.props.history.push('/user/dashboard');
                    }
                    // user auth and private route
                    if(!reload){
                        this.props.history.push('/user/dashboard');
                    }
                }

                this.setState({isLoading:false})
            })
        }
        
        render() {
            if(this.state.isLoading){
                return (
                    <div className  = "main_loader">
                        <CircularProgress thickness = {6} style = {{color:'red'}}/>
                    </div>
                )
            }
         
            return (
                <div>
                    <ComposedClass {...this.props} user = {this.props.user}/>
                </div>
            );
        }
    }

    function mapStateToProps(state){
        return{
            user:state.user
        }
    }

    return connect(mapStateToProps)(Auth);
}

