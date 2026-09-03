import { useEffect, useRef } from 'react'

const baseUrl = import.meta.env.BASE_URL

export default function VideoPlate({ src, className = '', feather = true, autoPlay = true, loop = true, videoRef }) {
  const localRef = useRef(null)
  const ref = videoRef || localRef
  const resolvedSrc = src.startsWith('http') ? src : `${baseUrl}${src.replace(/^\/+/, '')}`

  useEffect(() => {
    const el = ref.current
    if (!el || !autoPlay) return
    const play = () => el.play().catch(() => {})
    if (el.readyState >= 2) play()
    else el.addEventListener('loadeddata', play, { once: true })
    return () => el.removeEventListener('loadeddata', play)
  }, [autoPlay, ref])

  return (
    <div className={`video-plate ${className}`}>
      <video
        ref={ref}
        className="video-plate__media"
        src={resolvedSrc}
        muted
        playsInline
        loop={loop}
        autoPlay={autoPlay}
        preload="auto"
        aria-hidden="true"
      />
      {feather && <div className="video-plate__feather" aria-hidden="true" />}
      <div className="video-plate__shadow" aria-hidden="true" />
    </div>
  )
}
