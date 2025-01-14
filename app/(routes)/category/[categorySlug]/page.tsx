"use client"
import { useState } from "react"
import { useParams } from "next/navigation"

import { useGetCategoryProduct } from "@/api/getCategoryProduct"
import { ResponseType } from "@/types/response"
import { ProductType } from "@/types/product"

import { Separator } from "@/components/ui/separator"
import FiltersControlsCategory from "./components/filters-controls-category"
import SkeletonSchema from "@/components/skeletonSchema"
import ProductCard from "./components/product-card"


export default function Page() {

    const params = useParams()
    const { categorySlug } = params                                                   //console.log(categorySlug)
    const { result, loading }: ResponseType = useGetCategoryProduct(categorySlug)     //console.log(result)
    const [filterEstilo, setFilterEstilo] = useState('')

    const filteredProducts = result !== null && !loading && (
        filterEstilo === '' ? result : result.filter((product: ProductType) => product.estilo === filterEstilo)
    )                                                                                //console.log(filteredProducts)

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            {result !== null && !loading && (
                <h1 className="text-3xl font-medium text-primary">Accesorio: {result[0].category.categoryName}</h1>
            )}
            <Separator />

            <div className="sm:flex sm:justify-between">
                <FiltersControlsCategory setFilterEstilo={setFilterEstilo}/>
                <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
                    {loading && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                            <SkeletonSchema grid={3} />
                        </div>
                    )}
                    {filteredProducts != null && !loading && (
                        filteredProducts.map((product: ProductType) => (
                        <ProductCard key={product.id} product={product}/>
                        ))
                    )}
                    {filteredProducts !== null && !loading && filteredProducts.length === 0 && (
                        <p>No hay productos con este filtro. </p>
                    )}
                </div>
            </div>
        </div>
    )
}