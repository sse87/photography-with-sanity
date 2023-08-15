import type { ReactNode } from "react";
import Link from "next/link";

import { api } from "~/utils/api";

import ThemeSwitch from "~/components/ThemeSwitch";
import Layout from "~/components/Layout";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-accent/50 p-4 hover:bg-accent"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-accent/50 p-4 hover:bg-accent"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>
        <p className="text-2xl">
          {hello.data ? hello.data.greeting : "Loading tRPC query..."}
        </p>
        <ThemeSwitch />
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};
