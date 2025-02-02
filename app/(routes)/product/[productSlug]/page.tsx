"use client"

import { useGetProductBySlug } from "@/api/getProductBySlug"
import { ResponseType } from "@/types/response"
import { useParams } from "next/navigation"

import SkeletonProduct from "./components/skeleton-product"
import CarouselProduct from "./components/carousel-product"
import InfoProduct from "./components/info-product"

export default function Page() {
    const params = useParams();
    const productSlug = params?.productSlug as string; // Asegurar que es una cadena

    // Verificar si `productSlug` existe antes de hacer la petición
    const { result, loading }: ResponseType = useGetProductBySlug(productSlug || "");

    // Aseguramos que `result` sea un array y tomamos el primer producto
    const product = Array.isArray(result) && result.length > 0 ? result[0] : null;

    if (loading) {
        return <SkeletonProduct />;
    }

    if (!product) {
        return <p className="text-center text-red-500">Producto no encontrado</p>;
    }

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <CarouselProduct images={product.attributes.images?.data ?? []} />
                </div>
                <div className="sm:px-12">
                    <InfoProduct product={product} />
                </div>
            </div>
        </div>
    );
}