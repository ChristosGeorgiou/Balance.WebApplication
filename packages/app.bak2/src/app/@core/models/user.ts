import { Helpers } from '../../@shared/helpers'
import { Entity } from './entity'

export interface User extends Entity {
  username: string
  email?: string
  config?: {
    theme: 'light' | 'dark';
    layout?: 'box' | 'fluid';
    menu?: {
      size?: 'normal' | 'compact';
      items?: { [key: string]: boolean };
    };
  }
}

export const DEFAULT_USER: Partial<User> = {
  config: {
    theme: 'light',
    layout: 'box',
    menu: {
      size: 'compact',
      items: Helpers.allMenuItems()
    }
  }
}
