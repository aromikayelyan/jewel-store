import FeatureHighlights from '../components/home/FeatureHighlights.jsx'
import Hero from '../components/home/Hero.jsx'
import JournalPreview from '../components/home/JournalPreview.jsx'
import Newsletter from '../components/home/Newsletter.jsx'
import ProductShowcase from '../components/home/ProductShowcase.jsx'
import { useAppData } from '../context/AppDataProvider.jsx'

const Home = () => {
  const { featuredProducts, newestProducts, blogs } = useAppData()

  return (
    <>
      <Hero />
      <FeatureHighlights />
      <ProductShowcase
        eyebrow="Хиты"
        title="Украшения, которые выбирают чаще всего"
        description="Подборка изделий, в которых сочетаются архитектурные линии и мягкие органичные формы."
        products={featuredProducts.length ? featuredProducts : newestProducts.slice(0, 3)}
      />
      <ProductShowcase
        eyebrow="Новинки"
        title="Свежие поступления"
        description="Каждую неделю мы добавляем новые украшения лимитированными партиями."
        products={newestProducts.slice(0, 6)}
      />
      <JournalPreview posts={blogs.slice(0, 3)} />
      <Newsletter />
    </>
  )
}

export default Home
