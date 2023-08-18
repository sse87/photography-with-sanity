import type { ImageAsset, PortableTextBlock } from 'sanity'

export type DataImage = {
  alt: string | null
  asset: ImageAsset
}

export type DataProps = {
  title: string | null
  mainImage: DataImage | null
  body: PortableTextBlock | null
  images: DataImage[] | null
}
