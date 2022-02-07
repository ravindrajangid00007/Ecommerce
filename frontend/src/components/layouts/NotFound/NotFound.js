import React from 'react';
import './NotFound.css';
import {Link} from 'react-router-dom';
const NotFound = () => {
    return <>
        <div class="frem">
            <p>404</p>
            <h2>Look like you're lost</h2>
            <h5>the page you are looking for not avaible!</h5>
            <Link to="/">Go to Home</Link>
        </div>
    </>;
};

export default NotFound;
