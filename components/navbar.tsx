"use client"
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart, BaggageClaim } from "lucide-react"
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-list";
import ToggelTheme from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

const Navbar = () => {

    const router = useRouter()
    const cart = useCart()
    const { lovedItems } = useLovedProducts()

    return (
        <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl">
            <h1 className="text-3xl text-primary" onClick={() => router.push("/")}>
                muy
                <span className="font-bold">Sochi</span>
            </h1>
            <div className="items-center justify-between hidden sm:flex">
                <MenuList />
            </div>
            <div className="flex sm:hidden">
                <ItemsMenuMobile />
            </div>
            <div className="flex items-center justify-between gap-2 sm:gap-7">
                {cart.items.length == 0 ?
                    <ShoppingCart strokeWidth="1" className="cursor-pointer text-primary" onClick={() => router.push("/cart")} />
                    : (
                        <div className=" flex gap-1 text-primary" onClick={() => router.push("/cart")}>
                            <BaggageClaim strokeWidth={1} className="cursor-pointer" />
                            <span>{cart.items.length}</span>
                        </div>
                    )}
                <Heart strokeWidth="1" className={`cursor-pointer text-primary ${lovedItems.length > 0 && 'fill-primary'}`} onClick={() => router.push("/loved-products")} />
                {/* <User strokeWidth="1" className="cursor-pointer text-primary" /> */}
                <ToggelTheme />
            </div>
        </div>
    );
}

export default Navbar;