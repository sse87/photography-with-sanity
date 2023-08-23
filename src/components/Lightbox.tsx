'use client'

import { useEffect, useState } from 'react'
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/style.css'
import { SanityImage } from 'sanity-image'

import type { DataImage } from '~/types'

type LightboxProps = {
  images: DataImage[]
  className?: string
}

const baseUrl = 'https://cdn.sanity.io/images/tv6g15v8/production/'

const Lightbox = ({ images, className }: LightboxProps) => {
  // console.log('Lightbox props:', { images, className })
  const [isMounted, setIsMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const renderImage = images.map((image) => {
    return {
      id: image.asset._id,
      original: image.asset.url,
      thumbnail: image.asset.url,
      width: image.asset.metadata.dimensions.width,
      height: image.asset.metadata.dimensions.height,
      alt: image.alt,
      lqip: image.asset.metadata.lqip,
    }
  })
  // console.log('renderImage:', renderImage)

  return (
    <Gallery>
      <div className={className}>
        {renderImage.map((image) => (
          <Item
            key={image.id}
            original={image.original}
            thumbnail={image.thumbnail}
            width={image.width}
            height={image.height}
          >
            {({ ref, open }) => (
              <div
                ref={ref as React.Ref<HTMLDivElement>}
                className="cursor-pointer"
                onClick={open}
              >
                <SanityImage
                  id={image.id}
                  baseUrl={baseUrl}
                  width={500}
                  mode="cover"
                  sizes="(max-width: 500px) 100vw, 500px"
                  preview={image.lqip}
                  alt={image.alt ?? ''}
                />
              </div>
            )}
          </Item>
        ))}
      </div>
    </Gallery>
  )
}

export default Lightbox

/*


              // <NextImage
              //   ref={ref as React.Ref<HTMLImageElement | null>}
              //   onClick={open}
              //   src={image.original}
              // />

    <div id={galleryId} className={className}>
      {images.map((image) => (
        <a
          key={image.asset._id}
          href={image.asset.url}
          data-pswp-width={image.asset.metadata.dimensions.width}
          data-pswp-height={image.asset.metadata.dimensions.height}
          target="_blank"
          rel="noreferrer"
        >
          <NextImage
            src={`${image.asset.url}?q=75&fit=clip&auto=format`}
            width={image.asset.metadata.dimensions.width}
            height={image.asset.metadata.dimensions.height}
            alt={image.alt ?? ''}
            priority={false}
            className={childClassName}
            placeholder={'blur'}
            blurDataURL={image.asset.metadata.lqip}
          />
        </a>
      ))}
    </div>

*/
