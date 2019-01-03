import React from 'react';
import './Button.css';
import {Link} from 'react-router-dom';

const Button = (props) => {

    switch(props.type){
        case "default":
            return (
                <button className = {props.btnStyle}>
                    {props.title}
                </button>
        )
        case "link":
            return (
                <Link to = {props.linkTo}>
                    <button className = {props.btnStyle}>
                    {props.title}
                    </button>
                </Link>
            )
        default:
            return (
                <Link to = {props.linkTo}>
                    <button className = {props.btnStyle}>
                    {props.title}
                    </button>
                </Link>
            )
    }

};

export default Button;