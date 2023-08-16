import type { ReactNode } from 'react'

import Header from '~/routes/Header'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout
