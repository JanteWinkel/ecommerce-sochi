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

const FeaturedProducts = () => {
    const { result, loading, error }: ResponseType = useGetFeaturedProducts();
    const router = useRouter();
    const { addItem } = useCart();

    if (loading) {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
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

    console.log("Productos destacados:", result);

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

                        console.log(`Producto: ${productName}, Imagen URL: ${imageUrl}`);

                        return (
                            <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3 group">
                                <div className="p-1">
                                    <Card className="py-4 border-primary/30 shadow-none">
                                        <CardContent className="relative flex items-center justify-center px-6 py-2">
                                            {imageUrl ? (
                                                <Image 
                                                    src={imageUrl} 
                                                    alt={productName} 
                                                    width={270} 
                                                    height={270} 
                                                    className="rounded-lg"
                                                />
                                            ) : (
                                                <p>Imagen no disponible</p>
                                            )}
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
