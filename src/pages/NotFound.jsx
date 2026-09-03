import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center pt-24">
      <div className="container-edge">
        <p className="eyebrow mb-6">404</p>
        <h1 className="font-display font-semibold text-4xl mb-6">This page doesn't exist.</h1>
        <Link to="/" className="text-violet underline decoration-hairline underline-offset-4">
          Return home
        </Link>
      </div>
    </section>
  )
}
