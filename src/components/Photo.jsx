import { useLayoutEffect, useRef, useState } from 'react'
import { qualityPhoto } from '../content/photoQuality.js'

// Cover crops need enough pixels for their height as well as their visible width.
// Measure the actual photo box so narrow, tall cards do not select a small thumbnail.
export default function Photo({ image, src, srcSet, alt, sizes = '100vw', loading = 'lazy', ref: forwardedRef, ...props }) {
  const base = typeof image === 'string' ? { src: image, alt: '' } : image || { src, srcSet, alt: alt ?? '' }
  const source = qualityPhoto(alt === undefined ? base : { ...base, alt })
  const element = useRef(null)
  const [measuredSize, setMeasuredSize] = useState(null)
  useLayoutEffect(() => {
    const img = element.current
    if (!img || !source?.srcSet) return
    const measure = () => {
      const box = img.getBoundingClientRect()
      if (!box.width || !box.height) return
      const ratio = source.width && source.height ? source.width / source.height : img.naturalWidth / img.naturalHeight
      const fit = getComputedStyle(img).objectFit
      const coverWidth = fit === 'cover' && ratio ? Math.max(box.width, box.height * ratio) : box.width
      // This scene grows to the viewport; load its full-screen candidate before it expands.
      const width = img.closest('.sz') ? Math.max(coverWidth, window.innerWidth) : coverWidth
      const pixels = Math.ceil(width * 1.05 / 64) * 64
      setMeasuredSize(previous => previous === pixels ? previous : pixels)
    }
    measure()
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null
    observer?.observe(img)
    img.addEventListener('load', measure)
    window.addEventListener('resize', measure)
    return () => { observer?.disconnect(); img.removeEventListener('load', measure); window.removeEventListener('resize', measure) }
  }, [source?.src, source?.srcSet, source?.width, source?.height])
  const attach = node => {
    element.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }
  return <img {...source} {...props} ref={attach} sizes={source?.srcSet ? measuredSize ? `${measuredSize}px` : sizes : undefined} loading={loading} decoding="async" />
}
