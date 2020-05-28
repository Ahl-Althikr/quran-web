import { useState, useMethods } from '@anew/provider'
import React from 'react'

const App = () => {
  const state = useState(({ get }) => ({
    count: get.counter.count(),
    isIncrementing: get.counter.isIncrementing(),
  }))

  const methods = useMethods(({ commit, dispatch }) => ({
    incCount: commit.counter.incCount,
    decCount: commit.counter.decCount,
    incCountAsync: dispatch.counter.incCountAsync,
  }))

  return (
    <div>
      <h1>{state.count}</h1>
      <button disabled={state.isIncrementing} onClick={methods.incCount}>
        inc
      </button>
      <button disabled={state.isIncrementing} onClick={methods.decCount}>
        dec
      </button>
      <button disabled={state.isIncrementing} onClick={methods.incCountAsync}>
        incAsync
      </button>
    </div>
  )
}

export default App
