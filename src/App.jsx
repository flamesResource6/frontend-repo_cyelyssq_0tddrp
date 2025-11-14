import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'

function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      className={
        'h-14 px-6 rounded-2xl font-semibold text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
        'bg-[#6750A4] hover:bg-[#5a4694] focus:ring-[#6750A4] ' +
        className
      }
      {...props}
    >
      {children}
    </button>
  )
}

function SosButton({ onClick }) {
  return (
    <button
      aria-label="SOS"
      onClick={onClick}
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-[#D32F2F] text-white shadow-lg grid place-items-center hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-[#D32F2F]/30"
    >
      <span className="sr-only">SOS</span>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M22 12h-4"/><path d="M6 12H2"/><path d="M7.5 7.5 5 5"/><path d="m18.5 18.5 2.5 2.5"/><path d="M12 2v4"/><path d="M12 18v4"/><circle cx="12" cy="12" r="6"/>
      </svg>
    </button>
  )
}

function App() {
  const [theme, setTheme] = useState('light')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const backendBaseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    setTheme(mql.matches ? 'dark' : 'light')
    const fn = (e) => setTheme(e.matches ? 'dark' : 'light')
    mql.addEventListener('change', fn)
    return () => mql.removeEventListener('change', fn)
  }, [])

  const onLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${backendBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: res.statusText }))
        throw new Error(err.detail || 'Login failed')
      }
      const data = await res.json()
      setMessage(data.message || 'Success')
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-[#1C1B1F] text-[#E6E1E5]' : 'bg-[#FFFBFE] text-[#1C1B1F]'} min-h-screen relative overflow-hidden`}>      
      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#EADDFF] grid place-items-center">
              <span className="text-[#6750A4] font-bold">P</span>
            </div>
            <div>
              <p className="text-sm opacity-70">People of Determination</p>
              <h1 className="text-2xl font-bold">POD</h1>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <input
              type="search"
              placeholder="Search for anything..."
              aria-label="Search"
              className={`${theme==='dark'?'bg-[#1C1B1F] text-[#E6E1E5]':'bg-white text-[#1C1B1F]'} h-12 w-72 rounded-2xl px-4 border border-[#E7E0EC] focus:outline-none focus:ring-2 focus:ring-[#6750A4]`}
            />
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium bg-[#EADDFF] text-[#21005D] mb-4">
              <span>Inclusive by design</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Empowering People of Determination with accessible technology
            </h2>
            <p className="text-base opacity-80 mb-6 max-w-prose">
              Secure sign-in, guided onboarding, and an assistive marketplace — all built with accessibility at the core.
            </p>

            <form onSubmit={onLogin} className={`${theme==='dark'?'bg-[#1C1B1F]':'bg-white'} border border-[#E7E0EC] rounded-2xl p-5 shadow-sm w-full max-w-md`} aria-labelledby="loginTitle">
              <h3 id="loginTitle" className="text-xl font-semibold mb-4">Login</h3>
              <div className="space-y-3">
                <label className="block">
                  <span className="block text-sm mb-1">Email</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${theme==='dark'?'bg-[#1C1B1F] text-[#E6E1E5] border-[#49454F]':'bg-white text-[#1C1B1F] border-[#E7E0EC]'} w-full h-12 rounded-xl px-4 border focus:outline-none focus:ring-2 focus:ring-[#6750A4]`}
                    placeholder="you@example.com"
                  />
                </label>
                <label className="block">
                  <span className="block text-sm mb-1">Password</span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${theme==='dark'?'bg-[#1C1B1F] text-[#E6E1E5] border-[#49454F]':'bg-white text-[#1C1B1F] border-[#E7E0EC]'} w-full h-12 rounded-xl px-4 border focus:outline-none focus:ring-2 focus:ring-[#6750A4]`}
                    placeholder="••••••••"
                  />
                </label>
                <PrimaryButton type="submit" disabled={loading} className="w-full">
                  {loading ? 'Signing in...' : 'Login'}
                </PrimaryButton>
                {message && (
                  <div role="status" className="text-sm px-3 py-2 rounded-lg bg-[#E8DEF8] text-[#1D192B]">
                    {message}
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="relative h-[420px] md:h-[520px] order-1 lg:order-2">
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
              <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#60a5fa]/10 via-transparent to-[#a78bfa]/20"></div>
          </div>
        </section>
      </main>

      <SosButton onClick={() => alert('Emergency services contacted. Stay calm, help is on the way.')} />
    </div>
  )
}

export default App
