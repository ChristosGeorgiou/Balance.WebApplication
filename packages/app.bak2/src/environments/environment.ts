import pkg from '../../package.json'
import { Enviroment } from '../app/@core/models/enviroment'
import build from '../build.json'

export const environment: Enviroment = {
  production: false,
  build: build,
  version: pkg.version,
  sentry: {
    dsn: 'https://9710c0dc35d14a62a8725d354e9e915e@sentry.io/3249691',
    showReportDialog: true
  },
  servers: [{
    label: 'Local Server',
    url: 'http://localhost:3000'
  },{
    label: 'Demo Server',
    url: 'https://server.balnc.cgeosoft.com'
  }]
}

export default environment
