import { gettersPlugin } from '@anew/plugins'
import Store from '@anew/store'

import counter from './counter/counter'

export default new Store({
  modules: { counter },

  plugins: [gettersPlugin],
})
