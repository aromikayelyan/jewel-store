import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fetchBlogById, fetchBlogs, fetchProductById, fetchProducts } from '../api/client.js'
import { fallbackBlogs } from '../data/fallbackBlogs.js'
import { fallbackProducts } from '../data/fallbackProducts.js'

const AppDataContext = createContext(null)

export function AppDataProvider({ children }) {
  const [products, setProducts] = useState(fallbackProducts)
  const [blogs, setBlogs] = useState(fallbackBlogs)
  const [loading, setLoading] = useState({ products: true, blogs: true })
  const [errors, setErrors] = useState({ products: null, blogs: null })

  const loadProducts = useCallback(async () => {
    setLoading(s => ({ ...s, products: true }))
    try {
      const data = await fetchProducts()
      setProducts(data.length ? data : fallbackProducts)
      setErrors(s => ({ ...s, products: null }))
    } catch (error) {
      console.error('Не удалось загрузить продукты', error)
      setProducts(fallbackProducts)
      setErrors(s => ({ ...s, products: error }))
    } finally {
      setLoading(s => ({ ...s, products: false }))
    }
  }, [])

  const loadBlogs = useCallback(async () => {
    setLoading(s => ({ ...s, blogs: true }))
    try {
      const data = await fetchBlogs()
      setBlogs(data.length ? data : fallbackBlogs)
      setErrors(s => ({ ...s, blogs: null }))
    } catch (error) {
      console.error('Не удалось загрузить блог', error)
      setBlogs(fallbackBlogs)
      setErrors(s => ({ ...s, blogs: error }))
    } finally {
      setLoading(s => ({ ...s, blogs: false }))
    }
  }, [])

  useEffect(() => {
    loadProducts()
    loadBlogs()
  }, [loadProducts, loadBlogs])

  const categories = useMemo(() => {
    const unique = new Map()
    products.forEach(product => {
      if (!product?.categoryname) return
      const key = product.categoryname.toLowerCase()
      if (!unique.has(key)) {
        unique.set(key, {
          slug: key,
          title: product.categoryname,
          count: 1
        })
      } else {
        unique.get(key).count += 1
      }
    })
    return Array.from(unique.values())
      .sort((a, b) => a.title.localeCompare(b.title, 'ru'))
  }, [products])

  const featuredProducts = useMemo(
    () =>
      products
        .filter(item => item.forSlide || item.featured)
        .slice(0, 6),
    [products]
  )

  const newestProducts = useMemo(
    () => [...products].slice(0, 8),
    [products]
  )

  const getProduct = useCallback(
    async uid => {
      try {
        return await fetchProductById(uid)
      } catch (error) {
        const fallback = fallbackProducts.find(item => item.uid === uid)
        if (fallback) return fallback
        throw error
      }
    },
    []
  )

  const getBlog = useCallback(
    async uid => {
      try {
        return await fetchBlogById(uid)
      } catch (error) {
        const fallback = fallbackBlogs.find(item => item.uid === uid)
        if (fallback) return fallback
        throw error
      }
    },
    []
  )

  const value = useMemo(
    () => ({
      products,
      blogs,
      loading,
      errors,
      categories,
      featuredProducts,
      newestProducts,
      refreshProducts: loadProducts,
      refreshBlogs: loadBlogs,
      getProduct,
      getBlog
    }),
    [products, blogs, loading, errors, categories, featuredProducts, newestProducts, loadProducts, loadBlogs, getProduct, getBlog]
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  const context = useContext(AppDataContext)
  if (!context) {
    throw new Error('useAppData должен использоваться внутри AppDataProvider')
  }
  return context
}
