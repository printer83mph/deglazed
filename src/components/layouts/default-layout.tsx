import type { ReactNode } from 'react'

export const DefaultLayout = ({ children }: { children: ReactNode }) => (
  <main className="container mx-auto px-2 py-12">{children}</main>
)

const DefaultLayoutTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-display text-4xl font-bold tracking-tight">{children}</h1>
)

DefaultLayout.Title = DefaultLayoutTitle
