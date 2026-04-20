import { useState, useEffect, useCallback } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import LogoBubble from '../LogoBubble/LogoBubble'
import './Navbar.css'

/* Calculate logo size: 10% of viewport width, capped at 96px */
function getLogoSize() {
  return Math.min(Math.floor(window.innerWidth * 0.1), 96)
}

function Navbar() {
  const [logoSize, setLogoSize] = useState(getLogoSize)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Debounced resize handler to keep the logo responsive
  useEffect(() => {
    let timerId
    function handleResize() {
      clearTimeout(timerId)
      timerId = setTimeout(() => {
        setLogoSize(getLogoSize())
      }, 150)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(timerId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  /* Close menu on nav link click (for mobile) */
    const handleNavClick = useCallback(() => {
    setMenuOpen(false)
    }, [])

  /* Close menu on Escape key or click outside */
  useEffect(() => {
    function onKey(e) {
        if (e.key === "Escape") setMenuOpen(false);
    }
    function onClickOutside(e) {
        if (!e.target.closest(".navContainer")) setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClickOutside);
    return () => {
        document.removeEventListener("keydown", onKey);
        document.removeEventListener("click", onClickOutside);
    };
  }, []);

  return (
    <header className="navbar" role="banner">
      <nav className="navContainer" role="navigation" aria-label="Main navigation">
        {/* Logo on the left */}
        <div className="navLeft">
          <NavLink to="/" aria-label="Home" onClick={handleNavClick}>
            <LogoBubble size={logoSize} />
          </NavLink>
        </div>

        {/* Hamburger toggle for mobile */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="hamburgerBar" />
          <span className="hamburgerBar" />
          <span className="hamburgerBar" />
        </button>

        {/* Navigation links — visible on desktop, toggled on mobile */}
        <ul className={`navLinks ${menuOpen ? 'navLinksOpen' : ''}`}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => isActive ? 'navLink active' : 'navLink'}
              onClick={handleNavClick}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => isActive ? 'navLink active' : 'navLink'}
              onClick={handleNavClick}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) => isActive ? 'navLink active' : 'navLink'}
              onClick={handleNavClick}
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cv"
              className={({ isActive }) => isActive ? 'navLink active' : 'navLink'}
              onClick={handleNavClick}
            >
              CV
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
