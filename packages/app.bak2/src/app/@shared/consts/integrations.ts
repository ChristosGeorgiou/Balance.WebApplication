import { IntegrationView } from '../models/integration-view'

export const INTEGRATIONS: IntegrationView[] = [{
  key: 'server',
  title: 'Balnc Server',
  icon: ['far', 'smile'],
  color: '#6f42c1',
  description: 'Use the Balnc Server to enchanse features and activate intergrations.'
}, {
  key: 'giphy',
  title: 'Giphy',
  icon: ['far', 'file'],
  color: '#6157ff',
  description: 'Search gifs and add them to boards projects ets'
}, {
  key: 'stripe',
  title: 'Stripe',
  icon: ['fab', 'stripe-s'],
  color: '#5433FF',
  description: 'Stripe allows you to make and receive payments over the Internet',
  disabled: true
}, {
  key: 'mailgun',
  title: 'Mailgun',
  icon: ['fas', 'at'],
  color: '#bb1419',
  description: 'Transactional Email APIs that enable you to send, receive, and track emails',
  disabled: true
}, {
  key: 'mailerlite',
  title: 'MailerLite',
  icon: ['fas', 'comment-alt'],
  color: '#00a154',
  description: 'Create advanced email marketing campaigns with features like automation, landing pages and surveys',
  disabled: true
}]
