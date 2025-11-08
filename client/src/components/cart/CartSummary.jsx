import { Link } from 'react-router-dom'
import Button from '../common/Button.jsx'
import { formatPrice } from '../../utils/formatters.js'

const CartSummary = ({ subtotal }) => (
  <aside className="cart-summary glass-panel">
    <h3>Итого</h3>
    <div className="cart-summary__row">
      <span>Стоимость изделий</span>
      <span>{formatPrice(subtotal)}</span>
    </div>
    <div className="cart-summary__row">
      <span>Доставка</span>
      <span>Рассчитывается менеджером</span>
    </div>
    <p className="cart-summary__note">
      После оформления заказа мы свяжемся с вами, уточним размеры и предложим персональные варианты доставки.
    </p>
    <Button as={Link} to="/checkout" variant="primary" size="lg">
      Оформить заказ
    </Button>
  </aside>
)

export default CartSummary
