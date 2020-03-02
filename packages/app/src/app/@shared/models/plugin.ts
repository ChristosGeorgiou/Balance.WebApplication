export interface BPlugin {
  key: string
  title: string
  description?: string
  icon?: string[] | string
  color?: string
  config?: any
  disabled?: boolean
}
