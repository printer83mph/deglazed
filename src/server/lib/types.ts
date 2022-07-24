import { NextPage } from 'next'
import { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<T = unknown> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }
