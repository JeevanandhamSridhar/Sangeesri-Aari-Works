'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function ProductIdPage() {
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    if (params?.id) {
      router.replace(`/products/edit/${params.id}`)
    }
  }, [params, router])

  return (
    <div className="p-12 text-center font-inter text-sm text-cream/50">
      Loading product details...
    </div>
  )
}
