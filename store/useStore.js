import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      // CART
      cart: [],
      addToCart: (product) => set((state) => {
        const existing = state.cart.find(item => item.id === product.id)
        if (existing) {
          return {
            cart: state.cart.map(item =>
              item.id === product.id? {...item, qty: item.qty + 1 } : item
            )
          }
        }
        return { cart: [...state.cart,{...product, qty: 1 }] }
      }),
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id!== id)
      })),
      updateQty: (id, qty) => set((state) => ({
        cart: qty <= 0 
          ? state.cart.filter(item => item.id!== id)
          : state.cart.map(item => item.id === id? {...item, qty } : item)
      })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + parseInt(item.price) * item.qty, 0)
      },
      getCartCount: () => {
        const { cart } = get()
        return cart.reduce((count, item) => count + item.qty, 0)
      },

      // NOTIFICATIONS - FIX HYDRATION: crypto.randomUUID() au lieu de Date.now()
      notifications: [],
      addNotification: (text) => set((state) => ({
        notifications: [
          { 
            id: crypto.randomUUID(), 
            text, 
            read: false,
            createdAt: new Date().toISOString()
          }, 
          ...state.notifications
        ]
      })),
      markAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({...n, read: true }))
      })),
      getUnreadCount: () => {
        const { notifications } = get()
        return notifications.filter(n =>!n.read).length
      },

      // GROSSISTE
      grossiste: {
        whatsapp: null,
        connected: false
      },
      setWhatsapp: (numero) => set({
        grossiste: { whatsapp: numero, connected
