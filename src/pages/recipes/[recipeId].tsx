import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'

import { DefaultLayout } from 'components/layouts/default-layout'
import { NextPageWithLayout } from 'server/lib/types'
import Title from 'components/common/title'
import { RecipeDetails } from 'lib/types'
import { trpc } from 'utils/trpc'
import ssgHelpers from 'server/lib/ssg-helpers'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const ssg = await ssgHelpers()
  const { recipeId } = ctx.params as { recipeId: string }
  await ssg.fetchQuery('recipes.details', { recipeId })
  return { props: { trpcState: ssg.dehydrate(), recipeId }, revalidate: 5 }
}

const RecipePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ recipeId }) => {
  const { data: recipe } = trpc.useQuery(['recipes.details', { recipeId }])

  if (!recipe) {
    return <>Loading...</>
  }

  const { displayName, details: detailsJSON } = recipe

  const details = detailsJSON as RecipeDetails

  return (
    <>
      <Title>{displayName}</Title>
      <>{JSON.stringify(details)}</>
    </>
  )
}

RecipePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default RecipePage
