import { useCart } from '../../context/CartContext.jsx'
import { formatPrice } from '../../utils/formatters.js'

const CartItemRow = ({ item }) => {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="cart-item">
      <div className="cart-item__media">
        {item.image ? (
          <img src={item.image} alt={item.name} loading="lazy" />
        ) : (
          <div className="cart-item__placeholder">MOAH</div>
        )}
      </div>
      <div className="cart-item__body">
        <h4>{item.name}</h4>
        <div className="cart-item__controls">
          <label>
            Количество
            <input
              type="number"
              min="1"
              max="20"
              value={item.quantity}
              onChange={event => updateQuantity(item.uid, Number(event.target.value))}
            />
          </label>
          <button type="button" onClick={() => removeItem(item.uid)}>
            Удалить
          </button>
        </div>
      </div>
      <div className="cart-item__price">{formatPrice(item.price * item.quantity)}</div>
    </div>
  )
}

export default CartItemRow
