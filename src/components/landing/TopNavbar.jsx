import React, { useState,useEffect } from 'react'
import {Link} from 'react-scroll'

import '../css/TopNavbar.css'

const Navbar = () => {

    const [click, setClick] = useState(false)

    const closeMenu = () => setClick(false)

    const [navbarColor, setNavbarColor] = useState('transparent');

    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const threshold = 100; // Adjust the threshold value as needed
  
        if (scrollPosition > threshold) {
          setNavbarColor('#0d528eff'); // Add your desired color value
        } else {
          setNavbarColor('transparent');
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      // Clean up the event listener when the component is unmounted
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    

    return (
        <div className='header'  style={{ backgroundColor: navbarColor }}>
            <nav className='navbar'>
                <a href='/' className='logo'>
                    <img src="./images/title.png" alt='logo' />
                </a>
               
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                       <Link to="home" spy={true} smooth={true} offset={0} duration={500} onClick={closeMenu}>Home</Link>
                    </li>
                    <li className='nav-item'>
                    <Link to="about" spy={true} smooth={true} offset={-60} duration={500} onClick={closeMenu}>About</Link>
                    </li>
                    <li className='nav-item'>
                    <Link to="team" spy={true} smooth={true} offset={50} duration={500} onClick={closeMenu}>Contact</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar