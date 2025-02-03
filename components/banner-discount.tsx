import Link from "next/link";
import { buttonVariants } from "./ui/button";


const BannerDiscount = () => {
    return (
        <div className="p-5 sm:p-20 text-center">
            <h2 className="uppercase font-black text-2xl text-primary">Combos de cadenas y pulseras únicas.</h2>
            <h3 className="mt-3 font-semibold">Descubre nuestras promociones.</h3>
            <div className="max-w-md mx-auto sm:flex justify-center gap-8 mt-5">
                <Link href="/category/sets" className={`${buttonVariants()} mr-4`}>Comprar</Link>
                <Link href="/contact" className={`${buttonVariants({ variant: "outline" })} mr-4`}>Más información</Link>
            </div>
        </div>
    );
}

export default BannerDiscount;  