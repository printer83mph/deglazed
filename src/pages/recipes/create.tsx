import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Season } from '@prisma/client'

import { DefaultLayout } from 'components/layouts/default-layout'
import Title from 'components/common/title'
import { defaultRecipe, recipeSchema } from 'lib/schemas'
import { NextPageWithLayout } from 'server/lib/types'
import { trpc } from 'utils/trpc'
import { registerWithError } from 'utils/forms'
import { RecipeData } from 'lib/types'
import TextInput from 'components/ui/common/text-input'
import Button from 'components/ui/common/button'
import SelectInput from 'components/ui/common/hookform/select-input'
import Header from 'components/common/header'
import IngredientsInput from 'components/ui/recipes/ingredients-input'
import { seasons } from 'lib/constants/decoration'

const CreateRecipePage: NextPageWithLayout = () => {
  const router = useRouter()

  const recipeMutation = trpc.useMutation('private.recipes.new')

  const {
    register: reg,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: defaultRecipe,
  })
  const register = registerWithError(reg, errors)

  const onSubmit = useCallback<SubmitHandler<RecipeData>>(
    async (formData) => {
      const recipe = await recipeMutation.mutateAsync(formData)
      router.push({ pathname: `/recipes/${recipe.id}` })
    },
    [recipeMutation, router]
  )

  return (
    <div className="mt-12 px-2">
      <Title>New Recipe</Title>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-4"
      >
        <div className="flex grid-cols-2 flex-col gap-4 md:grid">
          <TextInput
            {...register('displayName')}
            description="Display Name"
            placeholder="Summer Smack Barm Pea Wet"
          />
          <SelectInput
            control={control}
            name="season"
            description="Season"
            options={Object.values(Season).map((season) => {
              const { Icon, name } = seasons[season]
              return {
                value: season,
                label: (
                  <div className="flex items-center gap-2" key={season}>
                    <Icon />
                    {name}
                  </div>
                ),
              }
            })}
          />
        </div>
        <Header>Ingredients</Header>
        <IngredientsInput control={control} />
        <Button isSubmit size="lg" className="ml-auto">
          Create New Recipe
        </Button>
      </form>
    </div>
  )
}

CreateRecipePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default CreateRecipePage
