import App from 'views/App'
import history from 'config/history'

export default {
  history,
  basename: process.env.PUBLIC_URL,
  component: App,
}
