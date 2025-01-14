import { useEffect, useState } from "react"


interface Product {
  id: number
}

export function useGetCategoryProduct(slug: string | string[]) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[category][slug][$eq]=${slug}`
  const [result, setResult] = useState<Product[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("") 

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url)
        if (!res.ok) {
          throw new Error("Error fetching data")
        }
        const json = await res.json()
        setResult(json.data)
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
  }, [url])

  return { loading, result, error }
}
