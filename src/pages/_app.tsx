import 'styles/globals.css'
import { withTRPC } from '@trpc/next'
import { SessionProvider } from 'next-auth/react'

import { AppRouter } from './api/trpc/[trpc]'

import { AppPropsWithLayout } from 'server/lib/types'

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page: any) => page)
  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  )
}

export default withTRPC<AppRouter>({
  config() {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc'
    return { url }
  },
  ssr: true,
})(MyApp)
