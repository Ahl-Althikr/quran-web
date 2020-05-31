import * as json from 'assets/json'

export default function createStore(propKey) {
  // State Prop Keys
  const isFetchingPropKey = 'isFetching'
  const isFetchedPropKey = 'isFetched'

  // Reducers Prop Keys
  const fetchDataSentPropKey = 'fetchDataSent'
  const fetchDataSuccessfulPropKey = 'fetchDataSuccessful'
  const fetchDataFailedPropKey = 'fetchDataFailed'

  // Action Prop Keys
  const fetchDataPropKey = 'fetchData'

  // Api Prop Keys
  const getDataPropKey = 'getData'

  return {
    [propKey]: {
      state: {
        [propKey]: {},
        [isFetchingPropKey]: false,
        [isFetchedPropKey]: false,
      },
      reducers: {
        [fetchDataSentPropKey]: () => ({
          [isFetchingPropKey]: true,
        }),

        [fetchDataSuccessfulPropKey]: (state, data) => ({
          [propKey]: data,
          [isFetchingPropKey]: false,
          [isFetchedPropKey]: true,
        }),

        [fetchDataFailedPropKey]: () => ({
          [isFetchingPropKey]: false,
          [isFetchedPropKey]: true,
        }),
      },
      actions: {
        [fetchDataPropKey]: async ({ api, get, commit }) => {
          if (get[isFetchedPropKey]() || Object.keys(get[propKey]()).length) {
            return
          }

          commit[fetchDataSentPropKey]()

          try {
            const verses = await api[getDataPropKey]()
            commit[fetchDataSuccessfulPropKey](verses)
          } catch (error) {
            commit[fetchDataFailedPropKey]()
          }
        },
      },
      api: {
        [getDataPropKey]: () => {
          return json[propKey]
        },
      },
    },
  }
}
