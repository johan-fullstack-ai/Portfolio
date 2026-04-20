import { Link } from 'react-router-dom'
import laptopImg from '../../assets/laptop.png'
import './Home.css'
import HiddenIframePrefetch from '../../utils/HiddenIframePrefetch'

function Home() {
  /* Smoothly scroll to the footer contact section */
  function handleContactClick(e) {
    e.preventDefault()
    const footer = document.getElementById('contact')
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero">
      <div className="heroContent">
        {/* Left-aligned text block */}
        <div className="heroText">
          <h1 className="heroName">Johan Granvinge</h1>
          <p className="heroTagline">Computer engineer and jurisconsult</p>

          <div className="heroButtons">
            {/* Primary CTA links to the Projects page */}
            <Link to="/projects" className="btnPrimary">
              View My Work
            </Link>

            {/* Secondary CTA scrolls to footer contact anchor */}
            <a
              href="#contact"
              onClick={handleContactClick}
              className="btnSecondary"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Laptop illustration anchored to the right — loaded with priority */}
        <div className="heroImage">
          <img
            src={laptopImg}
            alt="Laptop illustration"
            width="662"
            height="463"
            fetchPriority="high"
          />
        </div>
      </div>

      {/* Hidden prefetch of CV iframe */}
      <HiddenIframePrefetch src="https://johan-fullstack-ai.github.io/Web/" idleTimeout={2000} />
    </section>
  )
}

export default Home
