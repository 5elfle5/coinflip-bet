export enum ClusterNetwork {
  Mainnet = 'mainnet-beta',
  Testnet = 'testnet',
  Devnet = 'devnet',
  Custom = 'custom',
}

export interface Cluster {
  name: string
  endpoint: string
  network?: ClusterNetwork
  active?: boolean
}
