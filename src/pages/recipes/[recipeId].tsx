import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'
import superjson from 'superjson'

import { DefaultLayout } from 'components/layouts/default-layout'
import { NextPageWithLayout } from 'server/lib/types'
import { trpc } from 'utils/trpc'
import { prisma } from 'server/lib/prisma'
import { appRouter } from 'pages/api/trpc/[trpc]'
import Title from 'components/common/title'
import { RecipeDetails } from 'lib/types'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const ssg = await createSSGHelpers({
    ctx: { prisma },
    router: appRouter,
    transformer: superjson,
  })
  const { recipeId } = ctx.params as { recipeId: string }
  await ssg.fetchQuery('recipe.public.details', { recipeId })
  return { props: { trpcState: ssg.dehydrate(), recipeId }, revalidate: 5 }
}

const RecipePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ recipeId }) => {
  const { data: recipe } = trpc.useQuery([
    'recipe.public.details',
    { recipeId },
  ])

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
