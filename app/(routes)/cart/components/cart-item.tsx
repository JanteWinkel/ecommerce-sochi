import ProductImageMiniature from "@/app/product-images-miniature";
import ProductCategoryEstilo from "@/components/shared/product-category-estilo";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";

interface CartItemProps {
    product: ProductType;
}

const CartItem = (props: CartItemProps) => {
    const { product } = props;
    const { removeItem } = useCart();

    // Accede a la imagen y la categoría correctamente según la estructura de ProductType
    const imageUrl = product.attributes.images?.data?.[0]?.attributes?.url 
        ? (product.attributes.images.data[0].attributes.url.startsWith("http")
            ? product.attributes.images.data[0].attributes.url
            : `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.attributes.images.data[0].attributes.url}`)
        : "/path/to/default-image.jpg"; // Imagen por defecto si no hay imagen
    const categoryName = product.attributes.category?.data?.attributes?.categoryName ?? "Sin categoría";

    return (
        <li className="flex py-6 border-b">
            <ProductImageMiniature slug={product.attributes.slug} url={imageUrl} />

            <div className="flex justify-between flex-1 px-6">
                <div>
                    <h2 className="text-lg font-bold">{product.attributes.productName}</h2>
                    <p className="font-bold">{formatPrice(product.attributes.price)}</p>
                    <ProductCategoryEstilo categoryName={categoryName} estilo={product.attributes.estilo} />
                </div>
                <div>
                    <button
                        className={cn("rounded-full flex items-center justify-center bg-white dark:bg-black border shadow-md p-1 hover:scale-110 transition")}
                        onClick={() => removeItem(product.id)}
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </li>
    );
}

export default CartItem;
