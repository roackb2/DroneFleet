import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const loggedIn = true
  const router = useRouter()

  useEffect(() => {
    if (loggedIn) {
      router.push('/dashboard')
    }
  }, [router, loggedIn])

  return (
    <main className='h-full'>
      <div className='p-4'>
        <p>Login</p>
      </div>
    </main>
  )
}
