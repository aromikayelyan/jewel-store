import ProductCard from '../common/ProductCard.jsx'
import SectionHeading from '../common/SectionHeading.jsx'

const ProductShowcase = ({ products, title, eyebrow, description }) => (
  <section className="section">
    <div className="container">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="grid-3">
        {products.map(product => (
          <ProductCard key={product.uid} product={product} />
        ))}
      </div>
    </div>
  </section>
)

export default ProductShowcase
