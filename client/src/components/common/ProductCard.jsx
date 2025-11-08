import { Link } from 'react-router-dom'
import Button from './Button.jsx'
import { BagIcon } from './Icons.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { formatPrice, truncate } from '../../utils/formatters.js'

const ProductCard = ({ product, layout = 'vertical' }) => {
  const { addItem } = useCart()
  const cover = product.images?.[0]

  return (
    <article className={`product-card product-card--${layout}`}>
      <Link to={`/product/${product.uid}`} className="product-card__media" aria-label={product.name}>
        <div className="product-card__image" style={{ backgroundImage: cover ? `url(${cover})` : undefined }}>
          {!cover && <span className="product-card__placeholder">MOAH</span>}
        </div>
      </Link>
      <div className="product-card__body">
        <div>
          <Link to={`/product/${product.uid}`} className="product-card__title">
            {product.name}
          </Link>
          <p className="product-card__description">{truncate(product.description, 90)}</p>
        </div>
        <div className="product-card__footer">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <Button
            className="product-card__cta"
            onClick={() => addItem(product, 1)}
            aria-label={`Добавить ${product.name} в корзину`}
          >
            <BagIcon width={18} height={18} />
            <span>В корзину</span>
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
