import type { ReactElement } from 'react'
import Head from 'next/head'
import { PortableText } from '@portabletext/react'

import { client } from '@/sanity/lib/client'
import type { NextPageWithLayout } from '~/pages/_app'
import Layout from '~/components/Layout'
import SanityImage from '~/components/SanityImage'
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

        {mainImage && <SanityImage image={mainImage} />}

        {body && <PortableText value={body} />}

        {images?.map((image) => (
          <SanityImage key={image.asset._id} image={image} maxWidth={1400} />
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
