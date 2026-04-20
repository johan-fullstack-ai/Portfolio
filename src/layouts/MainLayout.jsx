import { Outlet } from 'react-router-dom'
import ScrollToTop from '../utils/ScrollToTop'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import laptop2Img from '../assets/laptop2.png'
import './MainLayout.css'

/* Wraps all pages with the shared navbar and footer */
function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>

      {/* Decorative laptop image displayed above the footer */}
      <div className="preFooterLaptop">
        <img
          src={laptop2Img}
          alt=""
          role="presentation"
          width="662"
          height="463"
          loading="lazy"
        />
      </div>

      <Footer />
    </>
  )
}

export default MainLayout
