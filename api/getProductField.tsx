import { ResultFilterTypes } from "@/types/filters"
import { useEffect, useState } from "react"

export function useGetProductField() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/content-type-builder/content-types/api::product.product`
  const [result, setResult] = useState<ResultFilterTypes | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
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
    }

    fetchData()
  }, [url]) // 'url' es la única dependencia aquí

  return { loading, result, error }
}
