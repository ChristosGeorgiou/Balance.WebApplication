export type HeaderMenu = {
  selected?: string
  items?: HeaderMenuItem[]
}

export type HeaderMenuItem = {
  id?: string
  label?: string
  icon?: string | string[]
  right?: boolean
}
