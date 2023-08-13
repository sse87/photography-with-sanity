import { type AppType } from "next/app";

import ThemeProvider from "~/core/ThemeProvider";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
