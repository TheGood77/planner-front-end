'use client'

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    window.location.href = '/auth'; // Перенаправление на /auth
  }, [])

  return null
}
