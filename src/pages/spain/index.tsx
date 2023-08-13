import Head from "next/head";

export default function Spain() {
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
      </div>
    </>
  );
}
