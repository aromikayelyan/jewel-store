import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BagIcon, CloseIcon, MenuIcon } from '../common/Icons.jsx'
import { useCart } from '../../context/CartContext.jsx'

const navItems = [
  { to: '/catalog', label: 'Коллекция' },
  { to: '/blog', label: 'Журнал' },
  { to: '/about', label: 'О нас' },
  { to: '/contact', label: 'Контакты' }
]

const Header = () => {
  const { totalItems } = useCart()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const closeMenu = () => setOpen(false)

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backdropFilter: 'blur(18px)',
        background: 'rgba(10, 10, 18, 0.78)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div className="container" style={{ height: 'var(--header-height)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%'
          }}
        >
          <Link
            to="/"
            onClick={closeMenu}
            style={{
              fontFamily: 'EB Garamond, serif',
              fontSize: '1.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)'
            }}
          >
            MOAH
          </Link>

          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem'
            }}
            className="desktop-nav"
          >
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'nav-link',
                    isActive ? 'nav-link--active' : '',
                    pathname.startsWith(item.to) ? 'nav-link--muted' : ''
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/cart" className="cart-link" aria-label="Корзина">
              <span className="cart-icon">
                <BagIcon width={22} height={22} />
                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
              </span>
              <span className="cart-label">Корзина</span>
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            className="mobile-toggle"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          >
            {open ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${open ? 'mobile-nav--open' : ''}`}>
        <div className="mobile-nav__inner">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `mobile-nav__link ${isActive ? 'mobile-nav__link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/cart" onClick={closeMenu} className="mobile-nav__cart">
            <BagIcon width={20} height={20} />
            <span>Корзина — {totalItems}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
