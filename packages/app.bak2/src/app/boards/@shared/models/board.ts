import { Entity } from '@balnc/core';

export interface Board extends Entity {
  name: string
  description?: string
  topic?: string
  creator?: string
  color?: string
  members?: {
    [k: string]: any;
  }[]
  avatar?: string
  archived?: boolean
}
