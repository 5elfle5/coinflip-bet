import { useCluster } from "@/custom-hooks/cluster/use-cluster"

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
