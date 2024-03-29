export interface Enviroment {
  production: boolean
  build: Build
  version: string
  sentry: { dsn: string, showReportDialog: boolean }
  servers: any[]
}

export interface Build {
  hash: string
  date: string
  branch: string
}
