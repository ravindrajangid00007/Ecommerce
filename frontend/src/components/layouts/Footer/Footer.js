import React from 'react'
import {Link} from 'react-router-dom';
import './Footer.css';
function Footer() {
    return (
        <footer className="footer">
            <div className="leftFooter">
            <h4>About Us</h4><h4>Image Location</h4>

            </div>
            <div className="midFooter">
            <h3>ECOMMERCE</h3>
            <p>Copyright 2021 &copy; ravindrajangid</p>
            </div>
            <div className="rightFooter">
                <h3>Follow Us</h3>
                <Link to="https://google.com">Instagram</Link>
                <Link to="https://twitter.com">Twitter</Link>
                <Link to="https://facebook.com">Facebook</Link>
            </div>
        </footer>
    )
}

export default Footer
