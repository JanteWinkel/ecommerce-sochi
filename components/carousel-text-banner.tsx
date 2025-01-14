"use client"

import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from 'embla-carousel-autoplay'

export const dataCarouselTop = [
    {
        id: 1,
        title: "Compra artesanal",
        description: "Productos hechos a mano y con dedicación",
        link: "#!"
    },
    {
        id: 2,
        title: "Atención personalizada",
        description: "Estamos aquí para ayudarte en tu compra",
        link: "#!"
    },
    {
        id: 3,
        title:  "Hecho en Margarita",
        description: "Apoya lo local con nuestros productos",
        link: "#!"
    },
]

const CarouselTextBanner = () => {
    const router = useRouter()

    return (
        <div className="bg-primary/30 dark:bg-primary">
            <Carousel className="w-full max-w-4xl mx-auto" plugins={[Autoplay({ delay: 3500 })]}>
                <CarouselContent>
                    {dataCarouselTop.map(({ id, title, link, description }) => (
                        <CarouselItem key={id} onClick={() => router.push(link)} className="cursor-pointer">
                            <div>
                                <Card className="shadow-none border-none bg-transparent">
                                    <CardContent className=" flex flex-col justify-center p-2 items-center text-center">
                                        <p className="sm:text-lg text-wrap dark:text-secondary">{title}</p>
                                        <p className="text-xs sm:text-sm text-wrap dark:text-secondary">{description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}

export default CarouselTextBanner;