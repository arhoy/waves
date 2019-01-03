import React from 'react';
import Button from '../utils/Button/Button';
import Login from './Login';

const Register_Login = () => {
    return (
        <div className = "page_wrapper">

            <div className = "container">
                <div className = "register_login_container">
                
                    <div className = "left">
                            <h1>New Customers</h1>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro esse voluptas laudantium nobis voluptate, aliquam est harum eaque non saepe rerum repudiandae consequatur reprehenderit suscipit debitis? Delectus sit impedit perspiciatis!        
                            </p>
                            <Button
                                btnStyle = "btn btn-primary"
                                title = "Create an account"
                                type = "link"
                                linkTo = "/register"
                                addStyles = {{
                                    margin: '10px 0 0 0'
                                }}
                            />
                    </div>

                    <div className = "right">
                          <h2>Registered Customers</h2> 
                          <p>Already a customer? Please login below</p>
                          <Login/>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Register_Login;