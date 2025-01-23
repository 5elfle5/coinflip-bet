import { useContext } from "react";
import { createContext } from 'react'
import { ClusterProviderContext } from "@/models/cluster-provider-context";

export const Context = createContext<ClusterProviderContext>({} as ClusterProviderContext)

export function useCluster() {
  return useContext(Context)
}