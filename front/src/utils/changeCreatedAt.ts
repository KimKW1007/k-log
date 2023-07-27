import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import React from 'react'

const changeCreatedAt = (createdAt : string) => {
  return format(new Date(createdAt), 'yyyy.MM.dd HH:mm', { locale: ko })
}

export default changeCreatedAt