const baseUrl = import.meta.env.BASE_URL

export default function BrandMark({ compact = false }) {
  return (
    <span className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`}>
      <img
        src={`${baseUrl}logo.png`}
        alt="Embassy of Education official logo"
        className="brand-mark__logo"
      />
    </span>
  )
}
