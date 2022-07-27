import { InferGetStaticPropsType, NextPage } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import { IconType } from 'react-icons'
import { SiGoogle } from 'react-icons/si'

import FancyBackground from 'components/common/fancy-background'
import Button from 'components/ui/common/button'

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
        <main className="flex flex-col rounded-lg bg-clay-100 p-12 dark:bg-clay-800">
          <h1 className="font-display text-4xl uppercase">Sign In</h1>
          <div className="mt-4 text-clay-600 dark:text-clay-300">
            With a Deglazed account, you can{' '}
            <span className="font-semibold">post your own recipes</span> and{' '}
            <span className="font-semibold">save others</span> to your
            collection.
          </div>
          <ul className="mt-8 flex flex-col gap-4">
            {providers &&
              Object.values(providers).map((provider) => {
                const Icon = providerIcons[provider.name] || (() => null)
                return (
                  <li key={provider.name}>
                    <Button
                      size="lg"
                      onClick={() => signIn(provider.id)}
                      className="flex items-center gap-3"
                    >
                      <Icon />
                      Sign in with {provider.name}
                    </Button>
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
