/* eslint-disable @next/next/no-img-element */
import { Expand, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import IconButton from "@/components/ui/icon-button";
import { useCart } from "@/hooks/use-cart";

type ProductCardProps = {
    product: ProductType
}

const ProductCard = (props: ProductCardProps) => {
    const { product } = props;
    const router = useRouter();
    const { addItem } = useCart();

    // Accede a los valores correctos según la estructura de product
    const images = product.attributes.images.data;
    const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${images[0]?.attributes.url}`;
    const productName = product.attributes.productName;
    const price = product.attributes.price;
    const estilo = product.attributes.estilo;
    const departamentoName = product.attributes.departamento?.data?.attributes?.departamentoName;

    return (
        <div className="relative p-2 transition-all duration-100 rounded-lg hover:shadow-md">
            <div className="absolute flex items-center justify-between gap-3 px-2 z-[1] top-4">
                {/* Si necesitas mostrar categoryName, puedes acceder de esta manera */}
                {/* <p className="px-2 py-1 text-xs text-white bg-primary rounded-full dark:bg-primary dark:text-black w-fit">
                {product.attributes.category.data.attributes.categoryName}</p> */}
                <p className="px-2 py-1 text-xs text-white bg-primary rounded-full dark:bg-primary dark:text-black w-fit">
                    {estilo}</p>
                <p className="px-2 py-1 text-xs text-white bg-primary rounded-full dark:bg-primary dark:text-black w-fit">
                    {departamentoName}</p>
            </div>
            <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
                <CarouselContent>
                    {images.map((image) => (
                        <CarouselItem key={image.id} className="group">
                            <div>
                                <Link href={`/product/${product.attributes.slug}`}>
                                    <img src={imageUrl}
                                        alt={productName}
                                        className="rounded-xl" />
                                </Link>
                            </div>
                            <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                <div className="flex justify-center gap-x-6">
                                    <IconButton onClick={() => router.push(`/product/${product.attributes.slug}`)} icon={<Expand size={20} className="text-primary dark:text-primary" />} />
                                    <IconButton onClick={() => addItem(product)} icon={<ShoppingCart size={20} className="text-primary dark:text-primary" />} />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <p className="font-bold text-center">{productName}</p>
            <p className="font-bold text-center">{formatPrice(price)}</p>
        </div>
    );
}

export default ProductCard;
