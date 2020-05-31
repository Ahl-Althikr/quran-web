import 'whatwg-fetch'
import Anew from '@anew/anew'
import Provider from '@anew/provider'
import Router from '@anew/router'

import './assets/styles/index.css'
import './assets/styles/fonts.css'
import { rootNode } from './config/nodes'
import store from './stores/store'
import routes from './routes/routes'

Anew.use(Provider, { store }).use(Router, { routes }).render(rootNode)
