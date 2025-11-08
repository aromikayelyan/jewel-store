import CartItemRow from '../components/cart/CartItemRow.jsx'
import CartSummary from '../components/cart/CartSummary.jsx'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useCart } from '../context/CartContext.jsx'

const CartPage = () => {
  const { items, subtotal, clearCart } = useCart()

  return (
    <section className="section">
      <div className="container cart">
        <header className="cart__header">
          <span className="tag">Корзина</span>
          <h1>Ваш выбор</h1>
        </header>

        {items.length === 0 ? (
          <EmptyState
            title="В корзине пусто"
            description="Перейдите в каталог, чтобы добавить украшение, или свяжитесь с нами для индивидуального заказа."
            action={<Button as="a" href="/catalog">К коллекции</Button>}
          />
        ) : (
          <div className="cart__layout">
            <div className="cart__items glass-panel">
              {items.map(item => (
                <CartItemRow key={item.uid} item={item} />
              ))}
              <div className="cart__actions">
                <Button variant="ghost" onClick={clearCart}>
                  Очистить корзину
                </Button>
              </div>
            </div>
            <CartSummary subtotal={subtotal} />
          </div>
        )}
      </div>
    </section>
  )
}

export default CartPage
