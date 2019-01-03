import React from 'react';
import {Link} from 'react-router-dom';

//==============
//    LINKS    //
//==============
const links = [
    { name: 'My Account', linkTo: '/user/dashboard'},
    { name: 'My Profile', linkTo: '/user/user_profile'},
    { name: 'My Cart', linkTo: '/user/cart'},
];

const UserLayout = (props) => {

    // generate links
    const generateLinks = (links)=>{
        return(
            links.map(link=>(
                <Link key = {link.name} to = {link.linkTo}>{link.name}</Link>
            ))
        ) 
    }

    return (
        <div className = "container">
            <div className = "user_container">
                <div className = "user_left_nav">
                    <h2>My Account</h2>
                    <div className = "links">
                        {generateLinks(links)}
                    </div>
                </div>
                <div className = "user_right">
                    {props.children}
                </div>
            </div>
            
        </div>
    );
};

export default UserLayout;