import { Link } from 'react-router-dom'
import { InstagramIcon, MailIcon, PhoneIcon } from '../common/Icons.jsx'

const year = new Date().getFullYear()

const Footer = () => (
  <footer
    style={{
      marginTop: '6rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      background:
        'linear-gradient(180deg, rgba(10, 10, 18, 0) 0%, rgba(10, 10, 18, 0.75) 45%, rgba(10, 10, 18, 0.95) 100%)'
    }}
  >
    <div className="container" style={{ padding: '4rem 0 3rem' }}>
      <div className="footer-grid">
        <div>
          <h2 className="footer-logo">MOAH Atelier</h2>
          <p className="footer-text">
            Украшения, созданные вручную из драгоценных металлов и камней с честным происхождением.
            Мы верим в долгую жизнь вещей и ценим индивидуальность.
          </p>
          <div className="footer-contacts">
            <a href="tel:+74951234567">
              <PhoneIcon width={18} height={18} /> +7 (495) 123-45-67
            </a>
            <a href="mailto:atelier@moah.ru">
              <MailIcon width={18} height={18} /> atelier@moah.ru
            </a>
          </div>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Навигация</p>
          <Link to="/catalog">Коллекция</Link>
          <Link to="/about">О мастерской</Link>
          <Link to="/contact">Связаться</Link>
          <Link to="/blog">Журнал</Link>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Сервис</p>
          <Link to="/checkout">Доставка и оплата</Link>
          <Link to="/contact">Индивидуальный заказ</Link>
          <Link to="/contact">Уход за украшениями</Link>
          <Link to="/contact">FAQ</Link>
        </div>

        <div className="footer-newsletter">
          <p className="footer-heading">Подписка</p>
          <p className="footer-text">
            Получайте приглашения на закрытые презентации и советы по уходу за украшениями раз в месяц.
          </p>
          <form
            className="newsletter-form"
            onSubmit={event => {
              event.preventDefault()
              const form = event.currentTarget
              form.reset()
            }}
          >
            <input type="email" name="email" placeholder="Email" required aria-label="Email" />
            <button type="submit">Подписаться</button>
          </form>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <InstagramIcon width={18} height={18} /> Instagram
            </a>
            <a href="mailto:atelier@moah.ru">
              <MailIcon width={18} height={18} /> Почта
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} MOAH Atelier. Все права защищены.</span>
        <div className="footer-bottom__links">
          <Link to="/contact">Политика конфиденциальности</Link>
          <Link to="/contact">Договор оферты</Link>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
