import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='navbar navbar-expand-md fixed-top bg-white'>
            <div className="container my-2">
                <div className='navbar-brand flex-grow-1'>
                    <Link to="/" className="text-dark font-weight-bold" style={{ textDecoration: 'none' }}>Manish Patel</Link>
                </div>
                <Link to="/register">
                    <button className="btn btn-outline-info ml-auto mx-3">
                        Register
                    </button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;