import Head from "next/head";

export default function Models() {
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
  );
}
