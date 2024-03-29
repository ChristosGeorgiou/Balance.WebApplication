import { Entity } from '@balnc/core';

export interface BUser extends Entity {
  board: string
  lastread: number
  typing: string
}
