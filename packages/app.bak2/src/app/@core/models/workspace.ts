export interface Workspace {
  key: string
  name: string
  created: number
  version: number
  errors?: boolean
  analytics?: boolean
  cache?: boolean
}

export const WORKSPACE_VERSION = 2

export const DEFAULT_WORKSPACE: Partial<Workspace> = {
  version: WORKSPACE_VERSION,
  errors: false,
  analytics: false,
  cache: false
}
