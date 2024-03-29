export interface TableProperty {
  label?: string
  d? (i: any): any
  val? (item: any): any
  click? (item: any): any
  style?: any
  format?: string
  type?: 'badge' | 'button' | 'date' | 'currency' | 'icon' | 'link' | 'image' | null
  template?: any
  icon?: any
  empty?: any
  badges?: any
  locked?: boolean
  hidden?: boolean
}

export interface TableSchema {
  name: string
  sort?: string
  properties: TableProperty[]
}
