import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GalleryDesign } from '@/data/galleryData'

interface WishlistStore {
  items: GalleryDesign[]
  addItem: (item: GalleryDesign) => void
  removeItem: (id: string) => void
  toggleItem: (item: GalleryDesign) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          if (state.items.some((i) => i.id === item.id)) return state
          return { items: [...state.items, item] }
        })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }))
      },

      toggleItem: (item) => {
        const exists = get().isInWishlist(item.id)
        if (exists) {
          get().removeItem(item.id)
        } else {
          get().addItem(item)
        }
      },

      isInWishlist: (id) => {
        return get().items.some((i) => i.id === id)
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'sangee-sri-wishlist',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
