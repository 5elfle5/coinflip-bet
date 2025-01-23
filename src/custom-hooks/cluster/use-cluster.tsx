import { Context } from "@/constants/default-clusters";
import { useContext } from "react";

export function useCluster() {
  return useContext(Context)
}