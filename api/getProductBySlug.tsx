import { useEffect, useState } from "react"

// Define el tipo para los productos, si tienes un tipo específico puedes importarlo
interface Product {
  id: number
  slug: string
  // otras propiedades del producto
}

export function useGetProductBySlug(slug: string | string[]) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`
  const [result, setResult] = useState<Product[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url)
        if (!res.ok) {
          throw new Error("Error fetching data")
        }
        const json = await res.json()
        console.log(json) // Depuración
        if (json && json.data) {
          setResult(json.data)
        } else {
          setError("Unexpected API response format")
        }
        setLoading(false)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("An unknown error occurred")
        }
        setLoading(false)
      }
    })()
  }, [url, slug])  // Se incluye 'url' en las dependencias de useEffect

  return { loading, result, error }
}
