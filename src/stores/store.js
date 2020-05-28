import {
  loggerPlugin,
  routerPlugin,
  gettersPlugin,
  persistPlugin,
} from '@anew/plugins'
import Store from '@anew/store'
import Router from '@anew/router'

import { PERSIST_KEY } from 'constants/app'
import history from 'config/history'

import createStore from './createStore'

const store = new Store({
  actions: {
    fetchData: (store) => {
      store.dispatch.verses.fetchData()
      store.dispatch.chapters.fetchData()
      store.dispatch.explanations.fetchData()
      store.dispatch.languages.fetchData()
      store.dispatch.pages.fetchData()
      store.dispatch.sections.fetchData()
    },
  },

  getters: {
    isFetching: (state) => {
      return (
        state.verses.isFetching ||
        state.chapters.isFetching ||
        state.explanations.isFetching ||
        state.languages.isFetching ||
        state.pages.isFetching ||
        state.sections.isFetching
      )
    },
  },

  modules: {
    ...createStore('verses'),
    ...createStore('chapters'),
    ...createStore('explanations'),
    ...createStore('languages'),
    ...createStore('pages'),
    ...createStore('sections'),
  },

  plugins: [
    ...(process.env.NODE_ENV === 'development' ? [loggerPlugin()] : []),
    gettersPlugin,
    persistPlugin({
      key: PERSIST_KEY,

      onPersist(state) {
        const {
          verses: { verses },
          chapters: { chapters },
          explanations: { explanations },
          languages: { languages },
          pages: { pages },
          sections: { sections },
        } = state

        return {
          verses: { verses },
          chapters: { chapters },
          explanations: { explanations },
          languages: { languages },
          pages: { pages },
          sections: { sections },
        }
      },
    }),
    routerPlugin({
      history,
      router: Router,
    }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  window.store = store
}

export default store
