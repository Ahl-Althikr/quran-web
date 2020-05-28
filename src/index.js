import Anew from '@anew/anew'
import Provider from '@anew/provider'

import App from './views/App'
import store from './stores/store'

Anew.use(Provider, { store }).render(App, '#root')
