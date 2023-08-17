import type { ReactElement } from 'react'
import Head from 'next/head'
import type { ImageAsset, PortableTextBlock } from 'sanity'
import { PortableText } from '@portabletext/react'

import { client } from '@/sanity/lib/client'
import type { NextPageWithLayout } from '~/pages/_app'
import Layout from '~/components/Layout'
import SanityImage from '@/src/components/SanityImage'

export type DataImage = {
  alt: string | null
  asset: ImageAsset
}

type DataProps = {
  title: string
  mainImage: DataImage
  body: PortableTextBlock
  images: DataImage[]
}

type IcelandPageProps = NextPageWithLayout<{ data: DataProps }>

const IcelandPage: IcelandPageProps = ({ data }) => {
  console.log('data:', data) // debug
  const { mainImage, body, images } = data
  return (
    <>
      <Head>
        <title>Iceland</title>
        <meta name="description" content="Images taken in Iceland" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Iceland
        </h1>

        <SanityImage image={mainImage} priority={true} />

        <PortableText value={body} />

        {images.map((image) => (
          <SanityImage key={image.asset._id} image={image} priority={false} />
        ))}
      </div>
    </>
  )
}

IcelandPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default IcelandPage

export async function getStaticProps() {
  const data = await client.fetch<DataProps[]>(
    `*[_type == "page" && title == $pageTitle] {
    title,
    mainImage {
      alt,
      asset->{ ..., metadata }
    },
    body,
    images[] {
      alt,
      asset->{ ..., metadata }
    }
  }`,
    { pageTitle: 'Iceland' }
  )

  return {
    props: {
      data: data[0],
    },
  }
}
