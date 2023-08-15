import type { ReactElement } from "react";
import Head from "next/head";

import type { NextPageWithLayout } from "~/pages/_app";
import Layout from "~/components/Layout";

const IcelandPage: NextPageWithLayout = () => {
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
      </div>
    </>
  );
};

IcelandPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default IcelandPage;
