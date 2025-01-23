import { Cluster } from "@/models/cluster";
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { defaultClusters } from "./default-clusters";


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
