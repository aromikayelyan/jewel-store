import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const STORAGE_KEY = 'moah-cart'

const initialState = { items: [] }

const readStorage = () => {
  if (typeof window === 'undefined') return initialState
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw)
    if (!parsed?.items) return initialState
    return {
      items: parsed.items
        .filter(item => item && item.uid && item.quantity > 0)
        .map(item => ({ ...item, quantity: Number(item.quantity) || 1 }))
    }
  } catch {
    return initialState
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product, quantity } = action.payload
      if (!product?.uid) return state
      const existing = state.items.find(item => item.uid === product.uid)
      if (existing) {
        return {
          items: state.items.map(item =>
            item.uid === product.uid
              ? { ...item, quantity: Math.min(item.quantity + quantity, 20) }
              : item
          )
        }
      }
      return {
        items: [
          ...state.items,
          {
            uid: product.uid,
            name: product.name,
            price: Number(product.price) || 0,
            image: product.images?.[0] || '',
            quantity: Math.min(quantity, 20)
          }
        ]
      }
    }
    case 'REMOVE':
      return { items: state.items.filter(item => item.uid !== action.payload.uid) }
    case 'UPDATE':
      return {
        items: state.items.map(item =>
          item.uid === action.payload.uid
            ? { ...item, quantity: Math.min(Math.max(action.payload.quantity, 1), 20) }
            : item
        )
      }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, readStorage)

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const totalItems = useMemo(
    () => state.items.reduce((acc, item) => acc + item.quantity, 0),
    [state.items]
  )

  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [state.items]
  )

  const value = useMemo(
    () => ({
      items: state.items,
      totalItems,
      subtotal,
      addItem: (product, quantity = 1) =>
        dispatch({ type: 'ADD', payload: { product, quantity } }),
      removeItem: uid => dispatch({ type: 'REMOVE', payload: { uid } }),
      updateQuantity: (uid, quantity) =>
        dispatch({ type: 'UPDATE', payload: { uid, quantity } }),
      clearCart: () => dispatch({ type: 'CLEAR' })
    }),
    [state.items, subtotal, totalItems]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart должен вызываться внутри CartProvider')
  return context
}
