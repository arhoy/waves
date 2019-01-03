import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
const Footer = () => {
    return (
        <footer className = "bck_b_dark">
            <div className = "container">
                <div className = "logo">
                    Waves
                </div>
                <div className = "wrapper">
                    <div className = "left">
                        <h2>Contact Info</h2>
                        <div className = "business_nfo">
                                <div className = "tag">
                                    <FontAwesomeIcon
                                        icon = {faCompass}
                                    />
                                    <div className = "nfo">
                                        <div>Address</div>
                                        <div>Xur Loco</div>
                                    </div>
                                </div>
                                <div className = "tag">
                                    <FontAwesomeIcon
                                        icon = {faPhone}
                                    />
                                    <div className = "nfo">
                                        <div>Address</div>
                                        <div>Xur Loco</div>
                                    </div>
                                </div>
                                <div className = "tag">
                                    <FontAwesomeIcon
                                        icon = {faEnvelope}
                                    />
                                    <div className = "nfo">
                                        <div>Address</div>
                                        <div>Xur Loco</div>
                                    </div>
                                </div>
                                <div className = "tag">
                                    <FontAwesomeIcon
                                        icon = {faClock}
                                    />
                                    <div className = "nfo">
                                        <div>Address</div>
                                        <div>Xur Loco</div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className = "left">
                        <h2>Be the first to know</h2>
                        <div> Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi nemo ut omnis! Asperiores ex, odio quisquam neque odit ad dolore debitis assumenda, doloremque facilis minima quam quasi accusamus iure similique! </div>
                    </div>
                </div>
            </div>
     
        </footer>
    );
};

export default Footer;