import React, { useContext, useState } from 'react';
import './styles/User.css';
import { FaBell, FaHome, FaUsers, FaFileAlt, FaNewspaper, FaPhoneAlt, FaSignOutAlt, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import ImageSlider from './ImageSlider/ImageSlider';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext/UserContext';

const User = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home'); // Add state for active link
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext); // Get user from UserContext

  // Extract the first letter of the username
  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  console.log(firstLetter);

  const toggleMenu = () => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  };

  const handleLinkClick = (link) => {
    if (window.innerWidth <= 768) {
      setMenuOpen(false); // Close the menu on link click if in mobile view
    }
    setActiveLink(link); // Set the active link based on the clicked link
  };

const GOTOLOANDETAILS =()=>{
  console.log(user);
  navigate('/PATHTOLOANDETAILS')
}


  return (
    <div className='UserHomePageContainer'>
      <div className='UserHomePageNavbar'>
        <div className='profile'>
          <span>{firstLetter}</span> {/* Display the first letter of the username */}
        </div>
        <div className='menu-button' onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" width="24px" height="24px">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
          </svg>
        </div>
        <nav className={menuOpen ? 'open' : ''}>
          <ul>
            <li className={activeLink === 'home' ? 'active' : ''}>
              <a href="#home"><FaHome size={24} /> Home</a>
            </li>
            <li className={activeLink === 'community-forum' ? 'active' : ''}>
              <a href="#community-forum" onClick={() => handleLinkClick('community-forum')}><FaUsers size={24} /> Community Talks</a>
            </li>
            <li className={activeLink === 'loans' ? 'active' : ''}>
              <a onClick={GOTOLOANDETAILS}><FaFileAlt size={24} /> Loans</a>
            </li>
            <li className={activeLink === 'news-now' ? 'active' : ''}>
              <a href="#news-now" onClick={() => handleLinkClick('news-now')}><FaNewspaper size={24} /> News Now</a>
            </li>
            <li className={activeLink === 'customer-care' ? 'active' : ''}>
              <a href="#customer-care" onClick={() => handleLinkClick('customer-care')}><FaPhoneAlt size={24} /> Customer Care</a>
            </li>
            <li className='notifications'>
              <a href="#notifications" onClick={() => handleLinkClick('notifications')}><FaBell size={24} /></a>
            </li>
            <li className='logout'>
              <a href="/PATHTOlogout" onClick={logout}><FaSignOutAlt size={24} /> Logout</a>
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
          <ImageSlider />
        </div>
      </div>
      <div className='UserHomePageFooter'>
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </div>
    </div>
  );
}

export default User;
