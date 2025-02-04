/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ResponseType } from "@/types/response";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "./ui/icon-button";
import { useCart } from "@/hooks/use-cart";
import ProductCategoryEstilo from "./shared/product-category-estilo";
import Image from "next/image";
import { useState } from "react"; // Importar useState para manejar el estado de carga de la imagen

const FeaturedProducts = () => {
    const { result, loading, error }: ResponseType = useGetFeaturedProducts();
    const router = useRouter();
    const { addItem } = useCart();
    const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({}); // Estado para manejar la carga de cada imagen

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SkeletonSchema grid={3} />
            </div>
        );
    }

    if (error) {
        return <p>Error al cargar los productos: {error}</p>;
    }

    if (!result || !Array.isArray(result)) {
        return <p>No se encontraron productos destacados.</p>;
    }

    return (
        <div className="max-w-6xl py-2 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 text-3xl sm:pb-8 text-primary">Productos destacados</h3>
            <Carousel className="text-primary">
                <CarouselContent className="-ml-2 md:-ml-4">
                    {result.map((product: ProductType) => {
                        const { id, attributes } = product;
                        const { slug, productName, images, category, estilo } = attributes;
                        const imageUrl = images?.data?.[0]?.attributes?.url
                            ? (images.data[0].attributes.url.startsWith("http")
                                ? images.data[0].attributes.url
                                : `${process.env.NEXT_PUBLIC_BACKEND_URL}${images.data[0].attributes.url}`)
                            : "/path/to/default-image.jpg"; // Imagen por defecto si no hay imagen
                        const categoryName = category?.data?.attributes?.categoryName ?? "Sin categoría";

                        return (
                            <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3 group">
                                <div className="p-1">
                                    <Card className="py-4 border-primary/30 shadow-none">
                                        <CardContent className="relative flex items-center justify-center px-6 py-2">
                                            {/* Mostrar el SkeletonSchema mientras la imagen se carga */}
                                            {!imageLoaded[id] && (
                                                <div className="w-[270px] h-[270px]">
                                                    <SkeletonSchema grid={1} />
                                                </div>
                                            )}
                                            {/* Imagen del producto */}
                                            <Image 
                                                src={imageUrl} 
                                                alt={productName} 
                                                width={270} 
                                                height={270} 
                                                className={`rounded-lg ${!imageLoaded[id] ? "hidden" : ""}`}
                                                onLoad={() => setImageLoaded((prev) => ({ ...prev, [id]: true }))} // Marcar la imagen como cargada
                                                onError={() => setImageLoaded((prev) => ({ ...prev, [id]: true }))} // Manejar errores de carga
                                            />
                                            {/* Botones de acción */}
                                            <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                                <div className="flex justify-center gap-x-6">
                                                    <IconButton 
                                                        onClick={() => router.push(`product/${slug}`)} 
                                                        icon={<Expand size={20} className="text-primary dark:text-primary" />} 
                                                    />
                                                    <IconButton 
                                                        onClick={() => addItem(product)} 
                                                        icon={<ShoppingCart size={20} className="text-primary dark:text-primary" />} 
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                        {/* Información del producto */}
                                        <div className="flex justify-between gap-4 px-8">
                                            <h3 className="text-lg font-bold">{productName}</h3>
                                        </div>
                                        <div className="gap-4 px-7">
                                            {categoryName && (
                                                <ProductCategoryEstilo categoryName={categoryName} estilo={estilo} />
                                            )}
                                        </div>
                                    </Card>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
    );
};

export default FeaturedProducts;