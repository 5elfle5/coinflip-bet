import { useConnection } from '@solana/wallet-adapter-react'
import { Connection } from '@solana/web3.js'
import { IconTrash } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { AppModal } from '../ui/ui-layout'
import { ClusterNetwork, useCluster } from './cluster-data-access'

export function ExplorerLink({ path, label, className }: { path: string; label: string; className?: string }) {
  const { getExplorerUrl } = useCluster()
  return (
    <a
      href={getExplorerUrl(path)}
      target="_blank"
      rel="noopener noreferrer"
      className={className ? className : `link font-mono`}
    >
      {label}
    </a>
  )
}

export function ClusterChecker({ children }: { children: ReactNode }) {
  const { cluster } = useCluster()
  const { connection } = useConnection()

  const query = useQuery({
    queryKey: ['version', { cluster, endpoint: connection.rpcEndpoint }],
    queryFn: () => connection.getVersion(),
    retry: 1,
  })
  if (query.isLoading) {
    return null
  }
  if (query.isError || !query.data) {
    return (
      <div className="alert alert-warning text-warning-content/80 rounded-none flex justify-center">
        <span>
          Error connecting to cluster <strong>{cluster.name}</strong>
        </span>
        <button className="btn btn-xs btn-neutral" onClick={() => query.refetch()}>
          Refresh
        </button>
      </div>
    )
  }
  return children
}

export function ClusterUiSelect() {
  const { clusters, setCluster, cluster } = useCluster()
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-primary rounded-btn">
        {cluster.name}
      </label>
      <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
        {clusters.map((item) => (
          <li key={item.name}>
            <button
              className={`btn btn-sm ${item.active ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setCluster(item)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
