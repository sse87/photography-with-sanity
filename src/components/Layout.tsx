import type { ReactElement } from "react";

import Header from "~/routes/Header";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-900">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
