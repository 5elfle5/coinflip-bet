import { activeClusterAtom, activeClustersAtom, clusterAtom, clustersAtom } from '@/constants/atoms'
import { Context } from '@/custom-hooks/cluster/use-cluster'
import { getClusterUrlParam } from '@/functions/cluster/get-cluster-url-param'
import { Cluster } from '@/models/cluster'
import { ClusterProviderContext } from '@/models/cluster-provider-context'
import { Connection } from '@solana/web3.js'
import { useAtomValue, useSetAtom } from 'jotai'
import { ReactNode } from 'react'
import toast from 'react-hot-toast'

export function ClusterProvider({ children }: { children: ReactNode }) {
  const cluster = useAtomValue(activeClusterAtom)
  const clusters = useAtomValue(activeClustersAtom)
  const setCluster = useSetAtom(clusterAtom)
  const setClusters = useSetAtom(clustersAtom)

  const value: ClusterProviderContext = {
    cluster,
    clusters: clusters.sort((a, b) => (a.name > b.name ? 1 : -1)),
    addCluster: (cluster: Cluster) => {
      try {
        new Connection(cluster.endpoint)
        setClusters([...clusters, cluster])
      } catch (err) {
        toast.error(`${err}`)
      }
    },
    deleteCluster: (cluster: Cluster) => {
      setClusters(clusters.filter((item) => item.name !== cluster.name))
    },
    setCluster: (cluster: Cluster) => setCluster(cluster),
    getExplorerUrl: (path: string) => `https://explorer.solana.com/${path}${getClusterUrlParam(cluster)}`,
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}
