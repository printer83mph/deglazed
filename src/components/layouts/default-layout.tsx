import type { ReactNode } from 'react'

export const DefaultLayout = ({ children }: { children: ReactNode }) => (
  <main className="container mx-auto">{children}</main>
)

const DefaultLayoutTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-4xl font-bold tracking-tight">{children}</h1>
)

DefaultLayout.Title = DefaultLayoutTitle
