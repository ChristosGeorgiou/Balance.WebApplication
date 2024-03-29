export interface MenuItem {
  type: 'divider' | 'button'
  highlight?: boolean
  label?: string
  sublabel?: string
  iconColor?: string
  cssClass?: string
  icon?: string | string[]
  route?: string | string[]
  expanded?: boolean
  note?: string
  noteColor?: string
  items?: MenuItem[]
  hide?: boolean
  action?: () => void
}
