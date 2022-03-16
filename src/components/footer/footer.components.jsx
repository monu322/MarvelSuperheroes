import React from "react";

import './footer.styles.scss';

import {Container} from 'react-bootstrap';

function Footer() {

    return (
        <div className="footer-copyright text-center">
            <Container className="page-container content-container">
                <Container fluid>
                    &copy; {new Date().getFullYear()} Copyright <a href="https://developer.marvel.com/"> Marvel.com </a>
                </Container>
            </Container>
      </div>
    )
}

export default Footer;
