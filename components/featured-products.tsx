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

const FeaturedProducts = () => {
    const { result, loading }: ResponseType = useGetFeaturedProducts();
    const router = useRouter();
    const { addItem } = useCart();

    // Asegurarnos de que result es un array de ProductType y no es null ni undefined
    if (loading) {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <SkeletonSchema grid={3} />
            </div>
        );
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
                        const { id, slug, productName, images, category, estilo } = product;
                        const imageUrl = images && images[0] && images[0].url ? images[0].url : null;

                        return (
                            <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3 group">
                                <div className="p-1">
                                    <Card className="py-4 border-primary/30 shadow-none">
                                        <CardContent className="relative flex items-center justify-center px-6 py-2">
                                            {imageUrl ? (
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`}
                                                    alt="Image featured"
                                                />
                                            ) : (
                                                <p>Imagen no disponible</p>
                                            )}
                                            <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                                <div className="flex justify-center gap-x-6">
                                                    <IconButton onClick={() => router.push(`product/${slug}`)} icon={<Expand size={20} className="text-primary dark:text-primary" />} />
                                                    <IconButton onClick={() => addItem(product)} icon={<ShoppingCart size={20} className="text-primary dark:text-primary" />} />
                                                </div>
                                            </div>
                                        </CardContent>
                                        <div className="flex justify-between gap-4 px-8">
                                            <h3 className="text-lg font-bold">{productName}</h3>
                                        </div>
                                        <div className="gap-4 px-7">
                                            {category && category.categoryName && (
                                                <ProductCategoryEstilo categoryName={category.categoryName} estilo={estilo} />
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
