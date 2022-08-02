import { DefaultLayout } from 'components/layouts/default-layout'
import { NextPageWithLayout } from 'server/lib/types'
import Title from 'components/common/title'
import { trpc } from 'utils/trpc'

const RecipesPage: NextPageWithLayout = () => {
  const { data: recipes } = trpc.useQuery(['recipe.public.list'])
  return (
    <>
      <Title>Hello!</Title>
      <ul>
        {recipes &&
          recipes.map(({ displayName, id }) => <li key={id}>{displayName}</li>)}
      </ul>
    </>
  )
}

RecipesPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default RecipesPage
