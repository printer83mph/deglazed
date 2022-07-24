import { InferGetStaticPropsType, NextPage } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import { IconType } from 'react-icons'
import { SiGoogle } from 'react-icons/si'

import FancyBackground from 'components/common/fancy-background'

export const getStaticProps = async () => {
  const providers = await getProviders()
  return { props: { providers } }
}

const providerIcons: { [key: string]: IconType } = {
  Google: SiGoogle,
}

const SignInPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  providers,
}) => (
  <>
    <FancyBackground />
    <div className="fixed inset-0 flex content-center items-center overflow-auto">
      <div className="m-auto w-full max-w-xl p-4">
        <main className="flex flex-col rounded-lg bg-white p-12 shadow-xl">
          <h1 className="text-4xl font-bold tracking-tight">Sign In</h1>
          <ul className="mt-3 flex flex-col gap-4">
            {providers &&
              Object.values(providers).map((provider) => {
                const Icon = providerIcons[provider.name] ?? (() => null)
                return (
                  <li key={provider.name}>
                    <button
                      type="button"
                      onClick={() => signIn(provider.id)}
                      className="flex items-center gap-3 rounded px-4 py-3 shadow-md"
                    >
                      <Icon />
                      Sign in with {provider.name}
                    </button>
                  </li>
                )
              })}
          </ul>
        </main>
      </div>
    </div>
  </>
)

export default SignInPage
