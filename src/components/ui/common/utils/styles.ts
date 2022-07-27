export const textInputStyle = (error: any) =>
  `w-full rounded-lg bg-clay-100 px-4 py-3 font-sans text-clay-700 outline-none transition-[box-shadow,background-color,color] placeholder:text-clay-300 focus:text-tomato-900 focus:ring-2 dark:bg-clay-800 dark:text-clay-200 dark:placeholder:text-clay-400 dark:focus:text-clay-100 ${
    error
      ? 'ring-2 ring-red-700 dark:ring-red-400'
      : 'ring-clay-400 dark:ring-clay-300'
  }`
