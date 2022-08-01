import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

import { DefaultLayout } from 'components/layouts/default-layout'
import Title from 'components/common/title'
import { recipeSchema } from 'lib/schemas'
import { NextPageWithLayout } from 'server/lib/types'
import { trpc } from 'utils/trpc'
import { registerWithError } from 'utils/forms'
import { RecipeData } from 'lib/types'
import TextInput from 'components/ui/common/text-input'
import Button from 'components/ui/common/button'
import { textInputStyle } from 'components/ui/common/utils/styles'

const CreateRecipePage: NextPageWithLayout = () => {
  const router = useRouter()

  const recipeMutation = trpc.useMutation('recipe.private.new')

  const {
    register: reg,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeData>({ resolver: zodResolver(recipeSchema) })
  const register = registerWithError(reg, errors)

  const onSubmit = useCallback<SubmitHandler<RecipeData>>(
    async (formData) => {
      const recipe = await recipeMutation.mutateAsync(formData)
      router.push({ pathname: `/recipes/${recipe.id}` })
    },
    [recipeMutation, router]
  )

  return (
    <div className="mt-12">
      <Title>New Recipe</Title>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-4"
      >
        <div className="flex flex-col md:grid gap-4 grid-cols-2">
          <TextInput
            // circular stuff bc recursive definitions...
            // @ts-ignore
            {...register('displayName')}
            description="Display Name"
            placeholder="Summer Smack Barm Pea Wet"
          />
          <select {...register('season')} className={textInputStyle(false)}>
            <option value="SPRING">Spring</option>
            <option value="SUMMER">Summer</option>
            <option value="FALL">Fall</option>
            <option value="WINTER">Winter</option>
          </select>
        </div>
        <Button isSubmit size="lg" className="ml-auto">
          Create New Recipe
        </Button>
      </form>
    </div>
  )
}

CreateRecipePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default CreateRecipePage
