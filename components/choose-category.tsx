/* eslint-disable @next/next/no-img-element */
"use client";

import { ResponseType } from "@/types/response";
import { useGetCategory } from "@/api/getProducts";
import Link from "next/link";
import { CategoryType } from "@/types/category";

const ChooseCategory = () => {
    const { result, loading }: ResponseType = useGetCategory();

    // Verificación de que `result` es un array y no es null ni undefined
    if (loading) {
        return <p>Cargando categorías...</p>;
    }

    if (!result || !Array.isArray(result) || result.length === 0) {
        return <p>No se encontraron categorías.</p>;
    }

    // Imprimir los datos recibidos en la consola
    console.log(result);

    return (
        <div className='max-w-6xl py-4 mx-auto sm:py-16 sm:px-24'>
            <h3 className='px-6 pb-4 text-3xl sm:pb-8 text-primary'>Elige tu categoria favorita</h3>

            <div className='grid gap-5 sm:grid-cols-3'>
                {result.map((category: CategoryType) => {
                    const imageUrl = category.mainImage && category.mainImage.url ? category.mainImage.url : null;
                    return (
                        <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className='relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg'
                        >
                            {imageUrl ? (
                                <img 
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`} 
                                    alt={category.categoryName} 
                                    className="max-w-[270px] transition duration-300 ease-in-out rounded-lg hover:scale-110"
                                />
                            ) : (
                                <p>Imagen no disponible</p>
                            )}
                            <p className="absolute w-full py-2 text-lg font-bold text-center text-black bottom-5 backdrop-blur-lg">
                                {category.categoryName}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
export default ChooseCategory;
