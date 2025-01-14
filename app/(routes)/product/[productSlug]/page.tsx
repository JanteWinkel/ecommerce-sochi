"use client"

import { useGetProductBySlug } from "@/api/getProductBySlug"
import { ResponseType } from "@/types/response"
import { useParams } from "next/navigation"

import SkeletonProduct from "./components/skeleton-product"
import CarouselProduct from "./components/carousel-product"
import InfoProduct from "./components/info-product"

export default function Page() {
    const params = useParams()
    const { productSlug } = params

    const { result, loading }: ResponseType = useGetProductBySlug(productSlug)

    // Asegúrate de que `result` es un array de productos y no sea null o undefined
    const product = Array.isArray(result) ? result[0] : null

    if (loading) {
        return <SkeletonProduct />
    }

    if (product == null) {
        return <p>Producto no encontrado</p>  // O algún otro mensaje si no hay producto
    }

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
            <div className="grid sm:grid-cols-2">
                <div>
                    <CarouselProduct images={product.images}/>
                </div>

                <div className="sm:px-12">
                    <InfoProduct product={product}/>
                </div>
            </div>
        </div>
    )
}
