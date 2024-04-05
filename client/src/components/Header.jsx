import React, { useContext, useState } from "react";
import './Header.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";
import Logo from "../Assets/Logo.svg";


import { FaPaintBrush } from 'react-icons/fa'; // Impor
// functions
import { logout } from "../api/user";

const Header = () => {
	const history = useNavigate();
	const { userhome,setuserhome } = useContext(UserContext);
	const { user, setUser } = useContext(UserContext);
	const { usertype, setUsertype } = useContext(UserContext);
    const [navColor, setNavColor] = useState('#fe9e0d'); // Initial color

	

	const handleLogout = (e) => {
		e.preventDefault();

		logout()
			.then((res) => {
				toast.success(res.message);
				// set user to null
				setUser(null);
				setUsertype(null);
				// redirect the user to login
				history("/login");
			})
			.catch((err) => console.error(err));
	};
	
	const changeNavColor = (color) => {
        setNavColor(color);
    };
	const linkStyles = {
    fontWeight: 'bold',
    marginRight: '10px', // Adjust spacing as needed
    textDecoration: 'none', // Remove underline
    color: 'inherit' // Inherit color from parent
};

	return (
		<nav className="navbar navbar-custom navbar-expand-lg navbar-dark " style={{ background: navColor }}>
			

			<Link className="navbar-brand" to="/">
				<img src={Logo} alt="Logo" width="280" height="200" style={{marginLeft:'20px'}}/>
			</Link>

			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>


			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav ms-auto">
    {!user ? (
        <>
            <li className="nav-item">
                <Link className="nav-link" style={linkStyles} to="/services">Services</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={linkStyles} to="/ordertracking">
                    Track order
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={linkStyles} to="/signup">
                    Sign Up
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={linkStyles} to="/login">
                    Login
                </Link>
            </li>
        </>
    ) : (
        <>
            <li className="nav-item">
                <Link className="nav-link" style={linkStyles} to="/services">Services</Link>
            </li>
             <li className="nav-item">
                <Link className="nav-link" style={linkStyles} to="/ordertracking">
                    Track order
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={linkStyles} to="/chats">
                    Chat
                </Link>
            </li> 
            {usertype === "10" && (
                <>
                  
            <li className="nav-item">
                <Link className="nav-link" style={linkStyles} to="/order">
                    Place order
                </Link>
            </li>
            
            <li className="nav-item">
                <Link className="nav-link" style={linkStyles} to={userhome}>
                    My Orders
                </Link>
            </li>
            
                </>
            )}

            {usertype === "20" && (
                <>

                <li className="nav-item">
                <Link className="nav-link" style={linkStyles} to={userhome}>
                    Update Order
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" style={linkStyles} to={userhome}>
                    My Orders
                </Link>
            </li>
            
                </>
            )}
            {usertype === "30" && (
                <>
                    
            <li className="nav-item">
                <Link className="nav-link" style={linkStyles} to="/newservice">
                    Add Service
                </Link>
            </li>
            
            <li className="nav-item">
                <Link className="nav-link" style={linkStyles} to={userhome}>
                    My Orders
                </Link>
            </li>
            
                </>
            )}
            <li className="nav-item">
                <span
                    className="nav-link"
                    style={{ cursor: "pointer", ...linkStyles }}
                    onClick={handleLogout}
                >
                    Logout
                </span>
            </li>
        </>
    )}
</ul>


			</div>
            <div className="dropdown">
               <button 
    className="btn btn-secondary dropdown-toggle" 
    type="button" 
    id="dropdownMenuButton" 
    data-toggle="dropdown" 
    aria-haspopup="true" 
    aria-expanded="false"
    style={{ background: 'transparent', border: 'none' }} // Apply transparent background and remove border
>
    <FaPaintBrush /> Switch Theme {/* Use the icon component */}
</button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					<button className="dropdown-item" onClick={() => changeNavColor('#fe9e0d')}>Orange (default)</button>
                    <button className="dropdown-item" onClick={() => changeNavColor('#708090')}>Slate Gray</button>
                    <button className="dropdown-item" onClick={() => changeNavColor('#556B2F')}>Olive Green</button>
                    <button className="dropdown-item" onClick={() => changeNavColor('#4682B4')}>Steel Blue</button>
                    <button className="dropdown-item" onClick={() => changeNavColor('#483D8B')}>Dark Slate Blue</button>
                    <button className="dropdown-item" onClick={() => changeNavColor('#696969')}>Dim Gray</button>
                </div>
            </div>

		</nav>
	);
};

export default Header;