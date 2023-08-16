import type { ReactElement } from 'react'
import Head from 'next/head'

import type { NextPageWithLayout } from '~/pages/_app'
import Layout from '~/components/Layout'

const ModelsPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Models</title>
        <meta name="description" content="Model images taken by Eiríkur" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Models
        </h1>
      </div>
    </>
  )
}

ModelsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default ModelsPage
