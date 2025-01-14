import { Menu } from "lucide-react";
import { PopoverContent, Popover, PopoverTrigger } from "./ui/popover"
import Link from "next/link";

const ItemsMenuMobile = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <Menu className="text-primary"/>
            </PopoverTrigger>
            <PopoverContent>
                <Link href="/category/collar" className="block text-primary">Collares</Link>
                <Link href="/category/pulsera" className="block text-primary">Pulseras</Link>
                <Link href="/category/sets" className="block text-primary">Packs</Link>
            </PopoverContent>
        </Popover>
    );
}

export default ItemsMenuMobile;