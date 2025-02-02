/* eslint-disable @next/next/no-img-element */
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface CarouselProductProps {
    images?: {  // Hacemos que `images` sea opcional
        id: number;
        attributes: {
            url: string;
        };
    }[];
}

const CarouselProduct = ({ images = [] }: CarouselProductProps) => {
    return (
        <div className="sm:px-16">
            <Carousel>
                <CarouselContent>
                    {images.length > 0 ? (
                        images.map((image) => {
                            const imageUrl = image.attributes.url.startsWith("http")
                                ? image.attributes.url
                                : `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`;

                            return (
                                <CarouselItem key={image.id}>
                                    <img
                                        src={imageUrl}
                                        alt={`Imagen ${image.id}`}
                                        className="rounded-lg"
                                    />
                                </CarouselItem>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-500">No hay imágenes disponibles</p>
                    )}
                </CarouselContent>
                <CarouselPrevious className="text-primary" />
                <CarouselNext className="text-primary" />
            </Carousel>
        </div>
    );
};

export default CarouselProduct;
