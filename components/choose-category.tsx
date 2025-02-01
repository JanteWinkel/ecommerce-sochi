/* eslint-disable @next/next/no-img-element */
"use client";

import { ResponseType } from "@/types/response";
import { useGetCategory } from "@/api/getProducts";
import Link from "next/link";
import { CategoryType } from "@/types/category";

const ChooseCategory = () => {
    const { result, loading }: ResponseType = useGetCategory();

    if (loading) {
        return <p>Cargando categorías...</p>;
    }

    if (!result || !Array.isArray(result) || result.length === 0) {
        return <p>No se encontraron categorías.</p>;
    }

    console.log(result);

    return (
        <div className='max-w-6xl py-4 mx-auto sm:py-16 sm:px-24'>
            <h3 className='px-6 pb-4 text-3xl sm:pb-8 text-primary'>Elige tu categoría favorita</h3>

            <div className='grid gap-5 sm:grid-cols-3'>
                {result.map((category: CategoryType) => {
                    const imageUrl = category.attributes.mainImage?.data?.attributes?.url
                        ? (category.attributes.mainImage.data.attributes.url.startsWith("http")
                            ? category.attributes.mainImage.data.attributes.url
                            : `${process.env.NEXT_PUBLIC_BACKEND_URL}${category.attributes.mainImage.data.attributes.url}`)
                        : null;

                    return (
                        <Link
                            key={category.id}
                            href={`/category/${category.attributes.slug}`}
                            className='relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg'
                        >
                            {imageUrl ? (
                                <img 
                                    src={imageUrl} 
                                    alt={category.attributes.categoryName} 
                                    className="max-w-[270px] transition duration-300 ease-in-out rounded-lg hover:scale-110"
                                />
                            ) : (
                                <p>Imagen no disponible</p>
                            )}
                            <p className="absolute w-full py-2 text-lg font-bold text-center text-black bottom-5 backdrop-blur-lg">
                                {category.attributes.categoryName}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default ChooseCategory;
