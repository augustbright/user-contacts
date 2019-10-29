import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {withRouter, Link} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import UserInfo from './user-info';

export default withRouter(({match}) => (
    <Navbar bg="light" expand="lg">
        <Link to="/" className='navbar-brand'>Phones</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <li className={'nav-item ' + (match.pathname === '/' ? 'active' : '')}>
                    <Link to='/' className='nav-link'>Home</Link>
                </li>
                <li className={'nav-item ' + (match.pathname === '/about' ? 'active' : '')}>
                    <Link to='/about' className='nav-link'>About</Link>
                </li>
            </Nav>
        </Navbar.Collapse>
        <Form>
            <UserInfo/>
        </Form>
    </Navbar>
));
