import { createSSGHelpers } from '@trpc/react/ssg'
import superjson from 'superjson'

import { appRouter } from 'pages/api/trpc/[trpc]'
import { createContext } from 'server/context'

const ssgHelpers = async () =>
  createSSGHelpers({
    ctx: await createContext(),
    router: appRouter,
    transformer: superjson,
  })

export default ssgHelpers
