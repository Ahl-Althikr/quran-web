export const incCountAsync = (store) => {
  store.commit.incCountStart()

  setTimeout(() => {
    store.commit.incCount()
    store.commit.incCountFinished()
  }, 1000)
}
