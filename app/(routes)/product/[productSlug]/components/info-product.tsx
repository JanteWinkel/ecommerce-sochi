import ProductCategoryEstilo from "@/components/shared/product-category-estilo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";

export type InfoProductProps = {
    product: ProductType
}

const InfoProduct = (props: InfoProductProps) => {
    const { product } = props;
    const { addItem } = useCart();
    const { addLoveItem } = useLovedProducts();

    // Accediendo a las propiedades correctas de product.attributes
    const productName = product.attributes.productName;
    const categoryName = product.attributes.category.data.attributes.categoryName;
    const estilo = product.attributes.estilo;
    const description = product.attributes.description;
    const price = product.attributes.price;

    return (
        <div className="px-6">
            <div className="mb-3 sm:flex flex-col">
                <h1 className="text-2xl mb-2">{productName}</h1>
                <ProductCategoryEstilo categoryName={categoryName} estilo={estilo} />
            </div>
            <Separator className="my-4 bg-primary/30" />
            <p>{description}</p>
            <Separator className="my-4 bg-primary/30" />
            <p className="my-4 text-2xl"> {formatPrice(price)}</p>
            <div className="flex items-center gap-5">
                <Button className="w-full" onClick={() => addItem(product)}> Comprar </Button>
                <Heart width={30} strokeWidth={1} className="text-primary transition duration-300 cursor-pointer hover:fill-primary" onClick={() => addLoveItem(product)} />
            </div>
        </div>
    );
}

export default InfoProduct;
