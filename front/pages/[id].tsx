import { useRouter } from 'next/router'
import React from 'react'

const BoardPage = () => {
  const router = useRouter()
  return (
    <div>{router.query && router.query.id}</div>
  )
}

export default BoardPage