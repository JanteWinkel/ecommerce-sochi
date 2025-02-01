"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { ResponseType } from "@/types/response";
import { ProductType } from "@/types/product";

import { Separator } from "@/components/ui/separator";
import FiltersControlsCategory from "./components/filters-controls-category";
import SkeletonSchema from "@/components/skeletonSchema";
import ProductCard from "./components/product-card";

export default function Page() {
  const params = useParams();
  const { categorySlug } = params as { categorySlug: string }; // Asegura que `categorySlug` sea una cadena
  const { result, loading }: ResponseType = useGetCategoryProduct(categorySlug);

  // Aseguramos que result es un array de productos, o asignamos un array vacío como valor por defecto
  const products: ProductType[] = Array.isArray(result) ? result : [];

  const [filterEstilo, setFilterEstilo] = useState<string>("");

  const filteredProducts: ProductType[] = filterEstilo === ""
    ? products
    : products.filter((product: ProductType) => product.attributes.estilo === filterEstilo);

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      {/* Verifica si `result` no está vacío o si está cargando */}
      {!loading && products.length > 0 && (
        <h1 className="text-3xl font-medium text-primary">
          Accesorio: {products[0]?.attributes.category?.data?.attributes.categoryName || "Categoría Desconocida"}
        </h1>
      )}
      <Separator />

      <div className="sm:flex sm:justify-between">
        <FiltersControlsCategory setFilterEstilo={setFilterEstilo} />
        <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
          {loading && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              <SkeletonSchema grid={3} />
            </div>
          )}
          {!loading && filteredProducts.length > 0 && filteredProducts.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {!loading && filteredProducts.length === 0 && (
            <p>No hay productos con este filtro.</p>
          )}
        </div>
      </div>
    </div>
  );
}
