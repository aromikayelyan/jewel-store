import axios from 'axios'

const base = (import.meta.env.VITE_API_URL || 'http://localhost:4700').replace(/\/$/, '')

export const apiClient = axios.create({
  baseURL: base,
  headers: { 'Content-Type': 'application/json' }
})

const normaliseImages = value => {
  if (!value) return []
  if (Array.isArray(value)) return value
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return value.split(',').map(v => v.trim()).filter(Boolean)
    }
  }
  return []
}

const withImages = entity => ({
  ...entity,
  images: normaliseImages(entity.images)
})

export async function fetchProducts(params) {
  const { data } = await apiClient.get('/products', { params })
  return (Array.isArray(data) ? data : []).map(withImages)
}

export async function fetchProductById(uid) {
  if (!uid) throw new Error('Product id is required')
  const { data } = await apiClient.get(`/products/${uid}`)
  return withImages(data)
}

export async function fetchBlogs(params) {
  const { data } = await apiClient.get('/blog', { params })
  return (Array.isArray(data) ? data : []).map(withImages)
}

export async function fetchBlogById(uid) {
  if (!uid) throw new Error('Blog id is required')
  const { data } = await apiClient.get(`/blog/${uid}`)
  return withImages(data)
}

export const API_BASE_URL = base
