import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
    return (
        <>
            <div className="mt-4 text-center">
                <p className="my-2 text-lg">Fabricamos accesorios personalizados.</p>
                <h4 className="mt-2 text-5xl text-primary font-extrabold upperce">muySochi</h4>
                <p className="my-2 text-lg">Si tienes un diseño en mente, ¡pregúntanos y haremos realidad tus deseos! 🤩</p>
                <Link href="/contact" className={buttonVariants({ variant: "outline" })}>Más información</Link>
            </div>
            {/* <div className="h-[350px] md:h-[600px] bg-[url('')] bg-center mt-5"/> */}
        </>
    );
}

export default BannerProduct;