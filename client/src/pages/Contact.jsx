import Button from '../components/common/Button.jsx'

const Contact = () => (
  <section className="section">
    <div className="container contact">
      <div className="glass-panel contact__info">
        <span className="tag">Контакты</span>
        <h1>Давайте создадим украшение вашей мечты</h1>
        <p>
          Расскажите, что вы представляете, и мы подготовим эскиз, подберём камни и предложим варианты материалов. Ответим в
          течение одного рабочего дня.
        </p>
        <ul>
          <li>
            <strong>Адрес мастерской</strong>
            <span>Санкт-Петербург, Вознесенский проспект, 14</span>
          </li>
          <li>
            <strong>Телефон</strong>
            <a href="tel:+74951234567">+7 (495) 123-45-67</a>
          </li>
          <li>
            <strong>Email</strong>
            <a href="mailto:atelier@moah.ru">atelier@moah.ru</a>
          </li>
          <li>
            <strong>График</strong>
            <span>Вт–Сб: 11:00 – 20:00</span>
          </li>
        </ul>
      </div>
      <form
        className="glass-panel contact__form"
        onSubmit={event => {
          event.preventDefault()
          const form = event.currentTarget
          form.reset()
        }}
      >
        <label>
          Ваше имя
          <input type="text" name="name" placeholder="Как к вам обращаться?" required />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="example@mail.ru" required />
        </label>
        <label>
          Телефон
          <input type="tel" name="phone" placeholder="+7 (___) ___-__-__" />
        </label>
        <label>
          Расскажите о задаче
          <textarea name="message" rows="4" placeholder="Хочу создать кольцо с изумрудом…" required />
        </label>
        <Button type="submit" variant="primary" size="lg">
          Отправить запрос
        </Button>
      </form>
    </div>
  </section>
)

export default Contact
