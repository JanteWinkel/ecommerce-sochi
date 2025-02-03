import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { toast } from './use-toast'
import { ProductType } from "@/types/product"


interface CartStore {
    items: ProductType[],
    addItem: (data: ProductType) => void
    removeItem: (id: number) => void
    removeAll: () => void
}

export const useCart = create(persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: ProductType) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id == data.id)

        if (existingItem) {
            const confirmAdd = window.confirm("El producto ya existe en el carrito. ¿Deseas añadirlo de nuevo?")
            if (!confirmAdd) return;
        }

        set({
            items: [...get().items, data]
        })
        toast({
            title:"Producto añadido al carrito 🛍️"
        })
  },
    removeItem: (id: number) => {
        const currentItems = get().items;
        const indexToRemove = currentItems.findIndex((item) => item.id === id);
        
        if (indexToRemove !== -1) {
            set({ items: [...currentItems.slice(0, indexToRemove), ...currentItems.slice(indexToRemove + 1)] });
            toast({
                title: "Producto eliminado del carrito🗑️"
            });
        }
    },
    
    removeAll: () => set({items: []})

  }), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
  })) 
