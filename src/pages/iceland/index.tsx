import type { ReactElement } from 'react'
import Head from 'next/head'
import NextImage from 'next/image'
import { PortableText } from '@portabletext/react'

import { client } from '@/sanity/lib/client'
import type { NextPageWithLayout } from '~/pages/_app'
import Layout from '~/components/Layout'
import type { DataProps } from '~/types'

type IcelandPageProps = NextPageWithLayout<{ data: DataProps }>

const IcelandPage: IcelandPageProps = ({ data }) => {
  // console.log('data:', data) // debug
  const { title, mainImage, body, images } = data

  return (
    <>
      <Head>
        <title>Iceland</title>
        <meta name="description" content="Images taken in Iceland" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          {title}
        </h1>

        {mainImage && (
          <NextImage
            src={mainImage.asset.url}
            width={mainImage.asset.metadata.dimensions.width}
            height={mainImage.asset.metadata.dimensions.height}
            alt={mainImage.alt ?? ''}
            priority={true}
            placeholder="blur"
            blurDataURL={mainImage.asset.metadata.lqip}
            quality={75}
            sizes="(max-width: 1368px) 100vw, 1368px"
          />
        )}

        {body && <PortableText value={body} />}

        {images?.map((image) => (
          <NextImage
            key={image.asset._id}
            src={image.asset.url}
            width={image.asset.metadata.dimensions.width}
            height={image.asset.metadata.dimensions.height}
            alt={image.alt ?? ''}
            priority={true}
            placeholder="blur"
            blurDataURL={image.asset.metadata.lqip}
            quality={75}
            sizes="(max-width: 1368px) 100vw, 1368px"
          />
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
    `*[_type == "page" && _id == $pageId] {
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
    { pageId: 'eb05c549-0cd8-4135-9f58-8716a4fe0a9c' }
  )

  return {
    props: {
      data: data
        ? data[0]
        : { title: null, mainImage: null, body: null, images: null },
    },
  }
}
