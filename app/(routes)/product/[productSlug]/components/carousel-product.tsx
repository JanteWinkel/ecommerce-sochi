/* eslint-disable @next/next/no-img-element */
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface CarouselProductProps {
    images: {
        id: number;
        url: string;
    }[];
}

const CarouselProduct = (props: CarouselProductProps) => {
    const { images } = props;

    return (
        <div className="sm:px-16">
            <Carousel>
                <CarouselContent>
                    {images.length > 0 ? (
                        images.map((image) => {
                            const imageUrl = image.url.startsWith("http")
                                ? image.url
                                : `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`;

                            return (
                                <CarouselItem key={image.id}>
                                    <img
                                        src={imageUrl}
                                        alt="Product image"
                                        className="rounded-lg"
                                    />
                                </CarouselItem>
                            );
                        })
                    ) : (
                        <p>No hay imágenes disponibles</p>
                    )}
                </CarouselContent>
                <CarouselPrevious className="text-primary" />
                <CarouselNext className="text-primary" />
            </Carousel>
        </div>
    );
}

export default CarouselProduct;
