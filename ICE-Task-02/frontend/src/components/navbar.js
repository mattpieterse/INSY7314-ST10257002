import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" />
                    APDS
                </NavLink>
                <div className="navbar" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <NavLink className="nav-link" to="/">
                            List
                        </NavLink>
                        <NavLink className="nav-link" to="/create">
                            Create Post
                        </NavLink>
                        <NavLink className="nav-link" to="/register">
                            Register
                        </NavLink>
                        <NavLink className="nav-link" to="/login">
                            Login
                        </NavLink>
                    </ul>           
                </div>
            </nav>
        </div>
    );
};