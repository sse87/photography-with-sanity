import type { ReactElement } from 'react'
import Head from 'next/head'
import { PortableText } from '@portabletext/react'

import { client } from '@/sanity/lib/client'
import type { NextPageWithLayout } from '~/pages/_app'
import Layout from '~/components/Layout'
import SanityImage from '~/components/SanityImage'
import type { DataProps } from '~/types'

type ModelsPageProps = NextPageWithLayout<{ data: DataProps }>

const ModelsPage: ModelsPageProps = ({ data }) => {
  // console.log('data:', data) // debug
  const { title, mainImage, body, images } = data

  return (
    <>
      <Head>
        <title>Models</title>
        <meta name="description" content="Model images taken by Eiríkur" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          {title}
        </h1>

        {mainImage && <SanityImage image={mainImage} />}

        {body && <PortableText value={body} />}

        <div className="grid grid-cols-2 gap-4">
          {images?.map((image) => (
            <SanityImage key={image.asset._id} image={image} maxWidth={676} />
          ))}
        </div>
      </div>
    </>
  )
}

ModelsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default ModelsPage

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
    { pageId: 'c459c05c-3cbb-45a4-af2a-3237c43dd8e1' }
  )

  return {
    props: {
      data: data
        ? data[0]
        : { title: null, mainImage: null, body: null, images: null },
    },
  }
}
