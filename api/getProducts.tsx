import { useEffect, useState } from "react"

export function useGetCategory() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`
  const [result, setResult] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url)

        if (!res.ok) {
          throw new Error('Failed to fetch categories')
        }

        const json = await res.json()
        setResult(json.data)  // Con 'unknown', puedes hacer validaciones antes de usar el dato
        setLoading(false)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unknown error occurred')
        }
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { loading, result, error }
}
