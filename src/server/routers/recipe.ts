import { z } from 'zod'
import { Season } from '@prisma/client'

import { createRouter } from 'server/context'
import requireAuth from 'server/middlewares/require-auth'

const publicRecipeRouter = createRouter().query('list', {
  input: z.object({ season: z.nativeEnum(Season) }).optional(),
  resolve() {},
})

const privateRecipeRouter = createRouter()
  .middleware(requireAuth())
  .query('', {
    resolve() {
      // TODO: this
      return 'Hello World!'
    },
  })

const recipeRouter = createRouter()
  .merge(publicRecipeRouter)
  .merge('my.', privateRecipeRouter)
export default recipeRouter
