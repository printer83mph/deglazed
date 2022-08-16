import Link from 'next/link'

import { DefaultLayout } from 'components/layouts/default-layout'
import { NextPageWithLayout } from 'server/lib/types'
import Title from 'components/common/title'
import { trpc } from 'utils/trpc'
import ssgHelpers from 'server/lib/ssg-helpers'

export const getStaticProps = async () => {
  const ssg = await ssgHelpers()
  await ssg.fetchQuery('recipes.list')
  return {
    props: { trpcState: ssg.dehydrate() },
    revalidate: 5,
  }
}

const RecipesPage: NextPageWithLayout = () => {
  const { data: recipes } = trpc.useQuery(['recipes.list'])
  return (
    <>
      <Title>Browse Recipes</Title>
      <ul>
        {recipes &&
          recipes.map(({ displayName, id }) => (
            <li key={id}>
              <Link href={`/recipes/${id}`}>{displayName}</Link>
            </li>
          ))}
      </ul>
    </>
  )
}

RecipesPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default RecipesPage
