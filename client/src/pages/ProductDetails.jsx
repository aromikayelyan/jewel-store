import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import ProductCard from '../components/common/ProductCard.jsx'
import LoadingState from '../components/common/LoadingState.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useAppData } from '../context/AppDataProvider.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/formatters.js'

const ProductDetails = () => {
  const { id } = useParams()
  const { getProduct, products } = useAppData()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let mounted = true
    setStatus('loading')
    getProduct(id)
      .then(data => {
        if (!mounted) return
        setProduct(data)
        setStatus('ready')
      })
      .catch(() => {
        if (!mounted) return
        setStatus('error')
      })
    return () => {
      mounted = false
    }
  }, [id, getProduct])

  const related = useMemo(() => {
    if (!product) return []
    return products
      .filter(item => item.uid !== product.uid && item.categoryname === product.categoryname)
      .slice(0, 3)
  }, [product, products])

  if (status === 'loading') {
    return (
      <section className="section">
        <div className="container">
          <LoadingState message="Готовим карточку изделия" />
        </div>
      </section>
    )
  }

  if (!product || status === 'error') {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            title="Украшение не найдено"
            description="Возможно, изделие было снято с продажи. Посмотрите другие позиции из коллекции."
            action={<Button as={Link} to="/catalog">Перейти в каталог</Button>}
          />
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="section">
        <div className="container product">
          <Link to="/catalog" className="product__back">
            ← Вернуться к коллекции
          </Link>
          <div className="product__grid glass-panel">
            <div className="product__gallery">
              {product.images?.length ? (
                product.images.map(src => (
                  <div key={src} className="product__image">
                    <img src={src} alt={product.name} loading="lazy" />
                  </div>
                ))
              ) : (
                <div className="product__placeholder">MOAH</div>
              )}
            </div>
            <div className="product__info">
              <span className="tag">{product.categoryname || 'MOAH Atelier'}</span>
              <h1>{product.name}</h1>
              <p className="product__description">{product.description}</p>
              <div className="product__price">{formatPrice(product.price)}</div>
              <div className="product__actions">
                <Button variant="primary" size="lg" onClick={() => addItem(product)}>
                  Добавить в корзину
                </Button>
                <Button as={Link} to="/contact" variant="ghost" size="lg">
                  Индивидуальный заказ
                </Button>
              </div>
              <dl className="product__meta">
                {product.material && (
                  <div>
                    <dt>Материал</dt>
                    <dd>{product.material}</dd>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <dt>Вес</dt>
                    <dd>{product.weight} г</dd>
                  </div>
                )}
                {product.sizes && (
                  <div>
                    <dt>Размеры</dt>
                    <dd>{product.sizes}</dd>
                  </div>
                )}
                {product.colorus && (
                  <div>
                    <dt>Цвета</dt>
                    <dd>{product.colorus}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-related__title">Вам также могут понравиться</h2>
            <div className="grid-3">
              {related.map(item => (
                <ProductCard key={item.uid} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ProductDetails
