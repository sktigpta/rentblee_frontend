import React, { useState, useRef, useEffect } from 'react';
import logo from '../../assets/Full-logo.png';
import Mob_logo from '../../assets/mob-logo.png';
import { Link } from 'react-router-dom'
import { useAuth } from '../../storeing-data/auth';

import "./navbar.css"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const { user, isLoggedIn } = useAuth();


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header>
                <nav>
                    <Link to="/">
                        <div className="logo">
                            <img src={logo} alt="Logo" />
                        </div>
                        <div className="Mob-logo">
                            <img src={Mob_logo} alt="Logo" />
                        </div>
                    </Link>
                    <div className="nav-menus">
                        {isLoggedIn ?
                            <>
                                <div className="profile" onClick={toggleMenu}>
                                    <img src={user.profilePicture} />
                                </div>
                                {isMenuOpen && (
                                    <div className="menu" ref={menuRef}>
                                        <ul>
                                            <Link className='Link' to="/settings">
                                                <li onClick={handleLinkClick}>
                                                    Settings
                                                </li>
                                            </Link>
                                            <Link className='Link' to="/profile">
                                                <li onClick={handleLinkClick}>
                                                    Profile
                                                </li>
                                            </Link>
                                            {user.isBusiness ?
                                                <Link className='Link' to="/business-dashboard">
                                                    <li onClick={handleLinkClick}>
                                                        Business Dashboard
                                                    </li>
                                                </Link>
                                                :
                                                <>
                                                    <Link className='Link' to="/business-registration">
                                                        <li onClick={handleLinkClick}>
                                                            Register as a business
                                                        </li>
                                                    </Link>
                                                </>

                                            }
                                            <Link className='Link' to="/logout">
                                                <li onClick={handleLinkClick}>
                                                    Logout
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>
                                )}
                            </>
                            :
                            <>
                                <Link to="/login"><button style={{ fontSize: "1em", width: "6em" }}>Login</button></Link>
                            </>

                        }
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
