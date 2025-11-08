import { useMemo, useState } from 'react'
import ProductCard from '../components/common/ProductCard.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import Button from '../components/common/Button.jsx'
import { useAppData } from '../context/AppDataProvider.jsx'

const sorters = {
  popular: (a, b) => a.name.localeCompare(b.name, 'ru'),
  'price-asc': (a, b) => (a.price || 0) - (b.price || 0),
  'price-desc': (a, b) => (b.price || 0) - (a.price || 0)
}

const Catalog = () => {
  const { products, categories } = useAppData()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('popular')
  const [priceLimit, setPriceLimit] = useState(0)

  const maxPrice = useMemo(
    () => Math.max(0, ...products.map(product => Number(product.price) || 0)),
    [products]
  )

  const filtered = useMemo(() => {
    let result = [...products]
    if (search) {
      const query = search.toLowerCase()
      result = result.filter(product =>
        product.name?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      )
    }

    if (category) {
      result = result.filter(product => product.categoryname?.toLowerCase() === category)
    }

    if (priceLimit) {
      result = result.filter(product => Number(product.price) <= priceLimit)
    }

    return result.sort(sorters[sort])
  }, [products, search, category, sort, priceLimit])

  return (
    <section className="section">
      <div className="container catalog">
        <SectionHeading
          eyebrow="Коллекция"
          title="Украшения MOAH"
          description="Все изделия создаём малыми партиями. Выберите то, что откликается вам по форме, текстуре и истории."
        />

        <div className="catalog__filters glass-panel">
          <div className="catalog__control">
            <label htmlFor="search">Поиск</label>
            <input
              id="search"
              type="search"
              placeholder="Найти по названию или описанию"
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
          </div>
          <div className="catalog__control">
            <label htmlFor="category">Категория</label>
            <select
              id="category"
              value={category}
              onChange={event => setCategory(event.target.value)}
            >
              <option value="">Все изделия</option>
              {categories.map(item => (
                <option key={item.slug} value={item.slug}>
                  {item.title} ({item.count})
                </option>
              ))}
            </select>
          </div>
          <div className="catalog__control">
            <label htmlFor="sort">Сортировка</label>
            <select id="sort" value={sort} onChange={event => setSort(event.target.value)}>
              <option value="popular">Популярное</option>
              <option value="price-asc">Цена по возрастанию</option>
              <option value="price-desc">Цена по убыванию</option>
            </select>
          </div>
          <div className="catalog__control">
            <label htmlFor="price">Максимальная цена</label>
            <input
              id="price"
              type="range"
              min="0"
              max={maxPrice || 1000}
              step="10"
              value={priceLimit || maxPrice}
              onChange={event => setPriceLimit(Number(event.target.value))}
            />
            <span className="catalog__range-value">
              {priceLimit ? `${priceLimit} $` : 'Без ограничений'}
            </span>
          </div>
          <Button variant="ghost" onClick={() => {
            setSearch('')
            setCategory('')
            setSort('popular')
            setPriceLimit(0)
          }}
          >
            Сбросить фильтры
          </Button>
        </div>

        {filtered.length > 0 ? (
          <div className="grid-3">
            {filtered.map(product => (
              <ProductCard key={product.uid} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Нет таких украшений"
            description="Попробуйте изменить параметры фильтра или загляните позже — мы регулярно пополняем коллекцию."
            action={<Button variant="primary" onClick={() => setSearch('')}>Смотреть все</Button>}
          />
        )}
      </div>
    </section>
  )
}

export default Catalog
