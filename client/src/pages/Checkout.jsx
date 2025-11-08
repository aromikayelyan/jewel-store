import Button from '../components/common/Button.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/formatters.js'

const Checkout = () => {
  const { items, subtotal } = useCart()

  return (
    <section className="section">
      <div className="container checkout">
        <header className="checkout__header">
          <span className="tag">Оформление</span>
          <h1>Последний шаг до вашей покупки</h1>
          <p>
            Оставьте контакты — менеджер свяжется для уточнения деталей, подберёт размер и предложит варианты доставки.
          </p>
        </header>
        <div className="checkout__layout">
          <form
            className="glass-panel checkout__form"
            onSubmit={event => {
              event.preventDefault()
              event.currentTarget.reset()
            }}
          >
            <label>
              Имя
              <input type="text" name="name" required placeholder="Например, Анна" />
            </label>
            <label>
              Email
              <input type="email" name="email" required placeholder="example@mail.ru" />
            </label>
            <label>
              Телефон
              <input type="tel" name="phone" required placeholder="+7 (___) ___-__-__" />
            </label>
            <label>
              Комментарий к заказу
              <textarea name="comment" rows="4" placeholder="Хочу изменить длину цепочки…" />
            </label>
            <Button type="submit" variant="primary" size="lg">
              Отправить заявку
            </Button>
          </form>
          <aside className="glass-panel checkout__summary">
            <h3>В заказе</h3>
            <ul>
              {items.map(item => (
                <li key={item.uid}>
                  <span>
                    {item.name}
                    <small> × {item.quantity}</small>
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="checkout__total">
              <span>Итого</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p>
              Мы подготовим для вас письмо с подтверждением заказа и отправим инструкцию по уходу за выбранными украшениями.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Checkout
