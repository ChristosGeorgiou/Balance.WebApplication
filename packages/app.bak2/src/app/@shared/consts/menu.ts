import { MenuItem } from '../models/menu-item'

export const MENU: MenuItem[] = [{
  label: 'Contacts',
  type: 'button',
  icon: 'users',
  route: ['/contacts']
}, {
  label: 'Invoices',
  type: 'button',
  icon: 'file-invoice-dollar',
  route: ['/invoices']
}, {
  label: 'Orders',
  type: 'button',
  icon: 'shopping-cart',
  route: ['/orders']
}, {
  label: 'Payments',
  type: 'button',
  icon: 'exchange-alt',
  route: ['/payments']
}, {
  label: 'Agreements',
  type: 'button',
  icon: 'signature',
  route: ['/agreements']
}, {
  label: 'Products',
  type: 'button',
  icon: 'warehouse',
  route: ['/products']
}, {
  label: 'Files',
  type: 'button',
  icon: 'folder-open',
  route: ['/files']
}, {
  label: 'Notes',
  type: 'button',
  icon: 'sticky-note',
  route: ['/notes']
}, {
  label: 'Projects',
  type: 'button',
  icon: 'project-diagram',
  route: ['/projects']
}, {
  label: 'Boards',
  type: 'button',
  icon: 'comments',
  route: ['/boards']
}, {
  label: 'Present',
  type: 'button',
  icon: 'desktop',
  route: ['/presentations']
  // }, {
  //   label: 'Analytics',
  // type: 'button'
  //   icon: 'chart-pie',
  //   route: ['/analytics'],
  //   disabled: true
}]
