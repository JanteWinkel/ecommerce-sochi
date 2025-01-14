import { useEffect, useState } from "react";

// Definimos la interfaz para un Producto
interface Product {
  id: number;
  name: string;
  price: number;
  isFeatured: boolean;
  // Puedes agregar otros campos que correspondan con la respuesta de tu API
}

export function useGetFeaturedProducts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[isFeatured][$eq]=true&populate=*`;

  // Tipamos el resultado como un arreglo de productos o null
  const [result, setResult] = useState<Product[] | null>(null);

  // Tipamos el estado de loading y error
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch featured products");
        }

        const json = await res.json();
        setResult(json.data);  // Ahora 'result' es un arreglo de productos
        setLoading(false);
      } catch (error: unknown) {
        // Manejo adecuado de errores
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);  // Dependencia de 'url'

  return { loading, result, error };
}
