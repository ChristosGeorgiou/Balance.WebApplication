import { RxDocument } from 'rxdb'

export interface PEvent {
  title?: string
  description?: string

  project: string
  type?: string
  status?: string
  parent?: string
  labels?: string[]

  insertedAt?: string
  insertedFrom?: string
  updatedAt?: string
  updatedFrom?: string
}

export type RxPEventDoc = RxDocument<PEvent> & PEvent
