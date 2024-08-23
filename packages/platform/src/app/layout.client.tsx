'use client'

import { createContext } from 'react'
import { Layout } from '@arco-design/web-react'
export const LayoutContext = createContext({})

const Header = Layout.Header
const Footer = Layout.Footer
const Content = Layout.Content
export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutContext.Provider value="dark">
      <Header></Header>
      <Content className="h-dvh max-w-md w-full py-4 flex flex-col  items-center ">
        {children}
      </Content>
      <Footer></Footer>
    </LayoutContext.Provider>
  )
}
