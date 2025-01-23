import { Cluster, ClusterNetwork } from "@/models/cluster";
import { clusterApiUrl } from "@solana/web3.js";
import { createContext } from 'react'
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { ClusterProviderContext } from "@/models/cluster-provider-context";


// By default, we don't configure the mainnet-beta cluster
// The endpoint provided by clusterApiUrl('mainnet-beta') does not allow access from the browser due to CORS restrictions
// To use the mainnet-beta cluster, provide a custom endpoint
export const defaultClusters: Cluster[] = [
  {
    name: 'devnet',
    endpoint: clusterApiUrl('devnet'),
    network: ClusterNetwork.Devnet,
  },
  { name: 'local', endpoint: 'http://localhost:8899' },
  {
    name: 'testnet',
    endpoint: clusterApiUrl('testnet'),
    network: ClusterNetwork.Testnet,
  },
]

export const clusterAtom = atomWithStorage<Cluster>('solana-cluster', defaultClusters[0])
export const clustersAtom = atomWithStorage<Cluster[]>('solana-clusters', defaultClusters)

export const activeClustersAtom = atom<Cluster[]>((get) => {
  const clusters = get(clustersAtom)
  const cluster = get(clusterAtom)
  return clusters.map((item) => ({
    ...item,
    active: item.name === cluster.name,
  }))
})

export const activeClusterAtom = atom<Cluster>((get) => {
  const clusters = get(activeClustersAtom)

  return clusters.find((item) => item.active) || clusters[0]
})

export const Context = createContext<ClusterProviderContext>({} as ClusterProviderContext)
