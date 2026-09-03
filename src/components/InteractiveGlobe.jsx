import { useEffect, useRef, useState } from 'react'

const points = [
  { name: 'United States', lat: 39, lon: -98 },
  { name: 'United Kingdom', lat: 54, lon: -3 },
  { name: 'Canada', lat: 56, lon: -106 },
  { name: 'Australia', lat: -25, lon: 134 },
  { name: 'Schengen / Europe', lat: 50, lon: 15 },
]

function project(lat, lon, rotY, rotX, radius) {
  const phi = (lat * Math.PI) / 180
  const lambda = ((lon + rotY) * Math.PI) / 180
  const x0 = Math.cos(phi) * Math.sin(lambda)
  const y0 = Math.sin(phi)
  const z0 = Math.cos(phi) * Math.cos(lambda)
  const rx = (rotX * Math.PI) / 180
  const y = y0 * Math.cos(rx) - z0 * Math.sin(rx)
  const z = y0 * Math.sin(rx) + z0 * Math.cos(rx)
  return { x: x0 * radius, y: -y * radius, z, visible: z > -0.05 }
}

export default function InteractiveGlobe() {
  const canvasRef = useRef(null)
  const dragRef = useRef(null)
  const [selected, setSelected] = useState(points[0])
  const [rotation, setRotation] = useState({ y: 28, x: -8 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(280, rect.width)
      height = Math.max(280, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const radius = Math.min(width, height) * 0.37
      const cx = width / 2
      const cy = height / 2
      const gradient = ctx.createRadialGradient(cx - radius * .3, cy - radius * .35, radius * .1, cx, cy, radius * 1.05)
      gradient.addColorStop(0, '#6b61c4')
      gradient.addColorStop(.5, '#393186')
      gradient.addColorStop(1, '#211b5e')
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.fillStyle = gradient; ctx.fill()
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.clip()
      ctx.strokeStyle = 'rgba(255,255,255,.16)'; ctx.lineWidth = 1
      for (let lat = -60; lat <= 60; lat += 20) {
        ctx.beginPath()
        for (let lon = -180; lon <= 180; lon += 3) {
          const p = project(lat, lon, rotation.y, rotation.x, radius)
          const px = cx + p.x, py = cy + p.y
          if (lon === -180) ctx.moveTo(px, py); else ctx.lineTo(px, py)
        }
        ctx.stroke()
      }
      for (let lon = -160; lon <= 180; lon += 20) {
        ctx.beginPath(); let started = false
        for (let lat = -90; lat <= 90; lat += 3) {
          const p = project(lat, lon, rotation.y, rotation.x, radius)
          const px = cx + p.x, py = cy + p.y
          if (p.z > 0) { if (!started) { ctx.moveTo(px, py); started = true } else ctx.lineTo(px, py) } else started = false
        }
        ctx.stroke()
      }
      ctx.restore()
      points.forEach((point) => {
        const p = project(point.lat, point.lon, rotation.y, rotation.x, radius)
        if (!p.visible) return
        const px = cx + p.x, py = cy + p.y
        const active = selected?.name === point.name
        ctx.beginPath(); ctx.arc(px, py, active ? 6 : 4.2, 0, Math.PI * 2)
        ctx.fillStyle = '#FFCC01'; ctx.shadowColor = 'rgba(255,204,1,.55)'; ctx.shadowBlur = active ? 18 : 10; ctx.fill(); ctx.shadowBlur = 0
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke()
      })
      raf = requestAnimationFrame(draw)
    }
    resize(); window.addEventListener('resize', resize); draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [rotation, selected])

  const pointerDown = (e) => { dragRef.current = { x: e.clientX, y: e.clientY, yRot: rotation.y, xRot: rotation.x }; e.currentTarget.setPointerCapture?.(e.pointerId) }
  const pointerMove = (e) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragRef.current.x, dy = e.clientY - dragRef.current.y
    setRotation({ y: dragRef.current.yRot + dx * .45, x: Math.max(-38, Math.min(38, dragRef.current.xRot + dy * .25)) })
  }
  const pointerUp = () => { dragRef.current = null }
  const clickPoint = (e) => {
    const canvas = canvasRef.current, rect = canvas?.getBoundingClientRect()
    if (!canvas || !rect) return
    const radius = Math.min(rect.width, rect.height) * .37, cx = rect.width / 2, cy = rect.height / 2
    let nearest = null, distance = Infinity
    points.forEach((point) => {
      const p = project(point.lat, point.lon, rotation.y, rotation.x, radius)
      if (!p.visible) return
      const d = Math.hypot(cx + p.x - (e.clientX - rect.left), cy + p.y - (e.clientY - rect.top))
      if (d < distance && d < 26) { distance = d; nearest = point }
    })
    if (nearest) setSelected(nearest)
  }

  return (
    <div className="globe-shell">
      <div className="globe-orbit globe-orbit--one" />
      <div className="globe-orbit globe-orbit--two" />
      <canvas ref={canvasRef} className="globe-canvas" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onClick={clickPoint} role="img" aria-label="Interactive globe showing Embassy of Education destination countries" />
      <div className="globe-caption">
        <span className="globe-caption__eyebrow">Explore destinations</span>
        <strong>{selected?.name}</strong>
        <span>Drag to rotate · click a marker</span>
      </div>
    </div>
  )
}
