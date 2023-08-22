import type { ReactElement } from 'react'
import Head from 'next/head'
import { PortableText } from '@portabletext/react'

import { client } from '@/sanity/lib/client'
import type { NextPageWithLayout } from '~/pages/_app'
import Layout from '~/components/Layout'
import SanityImage from '~/components/SanityImage'
import Lightbox from '~/components/Lightbox'
import type { DataProps } from '~/types'

type IcelandPageProps = NextPageWithLayout<{ data: DataProps }>

const IcelandPage: IcelandPageProps = ({ data }) => {
  // console.log('data:', data) // debug
  const { title, mainImage, body, images } = data
  console.log('images:', images) // debug

  return (
    <>
      <Head>
        <title>Bland</title>
        <meta name="description" content="Images taken in Iceland" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          {title}
        </h1>

        {mainImage && <SanityImage image={mainImage} priority={true} />}

        {body && <PortableText value={body} />}

        {/* <div className="grid grid-cols-3 gap-4">
          {images?.map((image) => (
            <SanityImage key={image.asset._id} image={image} priority={false} />
          ))}
        </div> */}

        {images && (
          <Lightbox images={images} className="grid grid-cols-3 gap-4" />
        )}
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
    { pageId: '63c59fef-8c15-4e37-89c0-2a5edae09f97' }
  )

  return {
    props: {
      data: data
        ? data[0]
        : { title: null, mainImage: null, body: null, images: null },
    },
  }
}
