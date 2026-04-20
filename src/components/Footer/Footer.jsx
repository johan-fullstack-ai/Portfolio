import { FaLinkedinIn } from 'react-icons/fa'
import './Footer.css'

/* Footer with contact section — anchor target for "Contact Me" CTA */
function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footerContent">
        <p className="footerText">I'd like to Connect with you!</p>

        {/* LinkedIn link with the small "in" logo in a rounded square */}
        <a
          href="https://www.linkedin.com/in/johan-g-301053152/"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedinLink"
          aria-label="Connect on LinkedIn"
        >
          <span className="linkedinIcon">
            <FaLinkedinIn />
          </span>
        </a>
      </div>

      <p className="footerCopyright">
        &copy; {new Date().getFullYear()} Johan Granvinge. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
