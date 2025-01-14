/* eslint-disable @next/next/no-img-element */
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface CarouselProductProps {
    images: {
        id: number;
        url: string;
    }[];
};


const CarouselProduct = (props: CarouselProductProps) => {
    const { images } = props
    //console.log(images)

    return (
        <div className="sm:px-16">
            <Carousel>
                <CarouselContent>
                    {images.map((image) => (
                        <CarouselItem key={image.id}>
                            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`} 
                            alt = "Image product" 
                            className="rounded-lg" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-primary" />
                <CarouselNext className="text-primary"/>
            </Carousel>
        </div>
    );
}

export default CarouselProduct;