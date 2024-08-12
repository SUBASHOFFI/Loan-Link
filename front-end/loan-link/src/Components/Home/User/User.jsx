import React, { useContext, useState } from 'react';
import './styles/User.css';
import { FaBell, FaHome, FaUsers, FaFileAlt, FaNewspaper, FaPhoneAlt, FaSignOutAlt, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import ImageSlider from './ImageSlider/ImageSlider';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext/UserContext';

const User = () => {
  const [menuOpen, setMenuOpen] = useState(false);
   const navigate=useNavigate();
   const {logout} = useContext(UserContext);


  const handleLinkClickonHome = () => {
    navigate("/Checking")
  };


  const toggleMenu = () => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(false); // Close the menu on link click if in mobile view
    }
  };

  return (
    <div className='UserHomePageContainer'>
      <div className='UserHomePageNavbar'>
        <div className='profile'>
          <span>U</span>
        </div>
        <div className='menu-button' onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" width="24px" height="24px">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
          </svg>
        </div>
        <nav className={menuOpen ? 'open' : ''}>
          <ul>
            <li><a href="#home" onClick={handleLinkClickonHome}><FaHome size={24} /> Home</a></li>
            <li><a href="#community-forum" onClick={handleLinkClick}><FaUsers size={24} /> Community Talks</a></li>
            <li><a href="#loans" onClick={handleLinkClick}><FaFileAlt size={24} /> Loans</a></li>
            <li><a href="#news-now" onClick={handleLinkClick}><FaNewspaper size={24} /> News Now</a></li>
            <li><a href="#customer-care" onClick={handleLinkClick}><FaPhoneAlt size={24} /> Customer Care</a></li>
            <li className='notifications'>
              <a href="#notifications" onClick={handleLinkClick}><FaBell size={24} /></a>
            </li>
            <li className='logout'>
              <a href="#logout" onClick={logout}><FaSignOutAlt size={24} /> Logout</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className='UserHomePageBody'>
      
        <div className={`sidebar ${menuOpen ? 'hidden' : ''}`}>
        
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={30} /></a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={30} /></a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={30} /></a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={30} /></a></li>
          </ul>
        </div>
        <div className='main-content'>
        <ImageSlider/>
          {/* <h1>Welcome to the User Dashboard</h1>
          <p>This is where your main content will go. Add any relevant information, charts, or interactive elements here.</p> */}
        </div>
      </div>
      <div className='UserHomePageFooter'>
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </div>
    </div>
  );
}

export default User;
