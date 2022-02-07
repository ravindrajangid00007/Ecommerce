import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css';
import LogoImage from '../../../images/canvaLogo.jpeg';
function Footer() {
    return (
        <footer className="footer">
            <div className="footerContainer">
                <div className="leftFooter">
                    <h3>contact us</h3>
                    <p>+91 8949392918</p>
                    <p>ravindrajangid00007@gmail.com</p>
                    <p>296 ,Krisna Nagar, Pal Road, Jodhpur</p>
                </div>
                <div className="midFooter">
                    <img src={LogoImage} alt="Ecommerce logo" />
                </div>
                <div className="rightFooter">
                    <div className="map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3138.141991372953!2d72.97278566138161!3d26.24896808186291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418eb9c6a68659%3A0xd6eb84bb81223f51!2sFashion%20house%20Jodhpur!5e0!3m2!1sen!2sin!4v1644136790004!5m2!1sen!2sin" width="100%" height="100%" allowFullScreen loading="lazy"></iframe>
                    </div>
                </div>
            </div>
            <div className="footer-copy-right">
                <p>COPYRIGHT 2022 &copy; ravindrajangid00007@gmail.com</p>
            </div>
        </footer>

    )
}

export default Footer
