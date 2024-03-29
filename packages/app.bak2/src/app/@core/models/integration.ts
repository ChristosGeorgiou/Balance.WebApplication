import { Entity } from '@balnc/core';

export interface Integration extends Entity {
  enabled: boolean
}

export interface GiphyIntegration extends Integration {
  apiKey: string
}

export interface CouchDBIntegration extends Integration {
  host: string
  db: string
}

export interface OrbitDBIntegration extends Integration {
  address: string
}
