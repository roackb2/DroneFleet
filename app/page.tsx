import { redirect } from 'next/navigation'

export default function App() {
  const loggedIn = true

  if (loggedIn) redirect('/dashboard')

  return (
    <main className='h-full'>
      <div className='p-4'>
        <p>Login</p>
      </div>
    </main>
  )
}
