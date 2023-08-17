import NextImage from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { client } from '@/sanity/lib/client'
import type { DataImage } from '~/pages/iceland'

type SanityImageProps = { image: DataImage; alt?: string; priority?: boolean }

const SanityImage = ({ image, alt, priority }: SanityImageProps) => {
  const imageProps = useNextSanityImage(client, image.asset)

  return (
    <NextImage
      {...imageProps}
      alt={alt ?? image.alt ?? ''}
      priority={priority}
    />
  )
}

export default SanityImage
