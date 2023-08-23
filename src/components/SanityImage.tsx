import { SanityImage as SanityImagePackage } from 'sanity-image'

import type { DataImage } from '~/types'

const baseUrl = 'https://cdn.sanity.io/images/tv6g15v8/production/'

type SanityImageProps = {
  image: DataImage
  alt?: string
  maxWidth?: number
  className?: string
}

const SanityImage = ({ image, alt, maxWidth, className }: SanityImageProps) => {
  const width = maxWidth
    ? Math.min(image.asset.metadata.dimensions.width, maxWidth)
    : image.asset.metadata.dimensions.width

  return (
    <SanityImagePackage
      id={image.asset._id}
      baseUrl={baseUrl}
      width={width}
      mode="cover"
      sizes={
        maxWidth ? `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px` : '100vw'
      }
      preview={image.asset.metadata.lqip}
      alt={alt ?? image.alt ?? ''}
      className={className}
    />
  )
}

export default SanityImage
