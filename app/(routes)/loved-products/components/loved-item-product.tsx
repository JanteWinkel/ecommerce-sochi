import ProductImageMiniature from "@/app/product-images-miniature";
import ProductCategoryEstilo from "@/components/shared/product-category-estilo";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";

interface LovedItemProductProps {
    product: ProductType
}

const LovedItemProduct = (props: LovedItemProductProps) => {
    const { product } = props;
    const { removeLovedItem } = useLovedProducts();
    const { addItem } = useCart();

    const addToCheckout = () => {
        addItem(product);
        removeLovedItem(product.id);
    };

    // Accediendo a las propiedades correctamente
    const productName = product.attributes.productName;
    const price = product.attributes.price;
    const estilo = product.attributes.estilo;
    const categoryName = product.attributes.category.data.attributes.categoryName;
    const imageUrl = product.attributes.images.data[0]?.attributes.url;

    // Verifica si la URL es absoluta o relativa
    const formattedImageUrl = imageUrl?.startsWith("http")
        ? imageUrl
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;

    return (
        <li className="flex py-6 border-b">
            <ProductImageMiniature slug={product.attributes.slug} url={formattedImageUrl} />
            <div className="flex justify-between flex-1 px-6">
                <div>
                    <h2 className="text-lg font-bold">{productName}</h2>
                    <p className="font-bold">{formatPrice(price)}</p>
                    <ProductCategoryEstilo categoryName={categoryName} estilo={estilo} />
                    
                    <Button className="mt-5 rounded-full" onClick={addToCheckout}>Añadir al carrito🛒</Button>
                </div>
                <div>
                    <button className={cn("rounded-full flex items-center justify-center bg-white dark:bg-black border shadow-md p-1 hover:scale-110 transition")}>
                        <X size={20} onClick={() => removeLovedItem(product.id)} />
                    </button>
                </div>
            </div>
        </li>
    );
}

export default LovedItemProduct;
