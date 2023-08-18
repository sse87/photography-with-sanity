import type { ReactElement } from 'react'
import Head from 'next/head'
import { PortableText } from '@portabletext/react'

import { client } from '@/sanity/lib/client'
import type { NextPageWithLayout } from '~/pages/_app'
import Layout from '~/components/Layout'
import SanityImage from '~/components/SanityImage'
import type { DataProps } from '~/types'

type SpainPageProps = NextPageWithLayout<{ data: DataProps }>

const SpainPage: SpainPageProps = ({ data }) => {
  console.log('data:', data) // debug
  const { mainImage, body, images } = data
  return (
    <>
      <Head>
        <title>Spain</title>
        <meta name="description" content="Images taken in Spain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Spain
        </h1>

        {mainImage && <SanityImage image={mainImage} priority={true} />}

        {body && <PortableText value={body} />}

        <div className="grid grid-cols-2 gap-4">
          {images?.map((image) => (
            <SanityImage key={image.asset._id} image={image} priority={false} />
          ))}
        </div>
      </div>
    </>
  )
}

SpainPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default SpainPage

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
    { pageTitle: 'Spain' }
  )

  return {
    props: {
      data: data
        ? data[0]
        : { title: null, mainImage: null, body: null, images: null },
    },
  }
}
