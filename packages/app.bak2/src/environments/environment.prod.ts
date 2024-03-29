import pkg from '../../package.json'
import { Enviroment } from '../app/@core/models/enviroment'
import build from '../build.json'

export const environment: Enviroment = {
  production: true,
  build: build,
  version: pkg.version,
  sentry: {
    dsn: 'https://9710c0dc35d14a62a8725d354e9e915e@sentry.io/3249691',
    showReportDialog: false
  },
  servers: [{
    label: 'Demo Server',
    url: 'https://server.balnc.cgeosoft.com'
  }]
}

export default environment
