import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
import Header from './Header.jsx'
import ScrollToTop from './ScrollToTop.jsx'

const Layout = () => (
  <div className="app-shell">
    <ScrollToTop />
    <Header />
    <main id="main-content">
      <Outlet />
    </main>
    <Footer />
  </div>
)

export default Layout
