/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/navigation";

interface ProductImageMiniatureProps {
   slug: string,
   url: string
}

const ProductImageMiniature = (props: ProductImageMiniatureProps) => {
    const { slug, url } = props;
    const router = useRouter();

    // Verifica si la URL ya es completa o necesita ser concatenada con NEXT_PUBLIC_BACKEND_URL
    const imageUrl = url.startsWith("http") ? url : `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`;

    return (
        <div onClick={() => router.push(`/product/${slug}`)} className="cursor-pointer">
            <img
                src={imageUrl}
                alt="Product"
                className="w-24 h-24 overflow-hidden rounded-md sm:w-auto sm:h-32"
            />
        </div>
    );
}

export default ProductImageMiniature;
