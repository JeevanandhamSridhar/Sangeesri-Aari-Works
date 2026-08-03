import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  name: string
  sku?: string // Internal product number e.g. SSA-101 (Hidden on customer site UI, shown in WhatsApp order summary & admin dashboard)
  slug: string
  image: string
  mrp: number
  salePrice: number
  quantity: number
  category: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleDrawer: () => void
  openDrawer: () => void
  closeDrawer: () => void
  getTotal: () => { subtotal: number; itemCount: number }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
              isOpen: true,
            }
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
            isOpen: true,
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
      toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),

      getTotal: () => {
        const items = get().items
        return {
          subtotal: items.reduce((sum, i) => sum + i.salePrice * i.quantity, 0),
          itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
        }
      },
    }),
    {
      name: 'sangee-sri-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
