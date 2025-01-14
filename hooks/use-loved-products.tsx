import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { toast } from './use-toast'
import { ProductType } from "@/types/product"

interface UseLovedProductsType {
    lovedItems: ProductType[],
    addLoveItem: (data: ProductType) => void
    removeLovedItem: (id: number) => void
}

export const useLovedProducts = create(persist<UseLovedProductsType>((set, get) => ({
    lovedItems: [],
    addLoveItem: (data: ProductType) => {
        const currentLovedItems = get().lovedItems;
        const existingItem = currentLovedItems.find((item) => item.id == data.id)

        if (existingItem) {
            return toast({
                title: "El producto ya existe en la lista de Me gusta ❤️",
                variant: "destructive"
            })
        }

        set({
            lovedItems: [...get().lovedItems, data]
        })
            toast({
            title: "Producto añadido a la lista de Me gusta ❤️‍🔥"
        })
    },

    removeLovedItem: (id: number) => {
        set({lovedItems: [...get().lovedItems.filter((item)=>item.id !== id)]})
        toast({
            title: "Producto se ha eliminado de la lista de Me gusta 💔"
        })
    }

}), {
    name: "loved-products-storage",
        storage: createJSONStorage(() => localStorage)
}))