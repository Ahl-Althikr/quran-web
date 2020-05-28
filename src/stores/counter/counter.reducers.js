export const incCount = (state) => ({
  count: state.count + 1,
})

export const decCount = (state) => ({
  count: state.count - 1,
})

export const incCountStart = (state) => ({
  isIncrementing: true,
})

export const incCountFinished = (state) => ({
  isIncrementing: false,
})
