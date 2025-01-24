
import { HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SolanaProvider } from '../solana/solana-provider'
import { ClusterProvider } from '../cluster/cluster-provider'
import { AppRoutes } from '../ui/app-routes'

const client = new QueryClient();

export function App() {
  return (
    <HashRouter>
      <QueryClientProvider client={client}>
        <ClusterProvider>
          <SolanaProvider>
            <AppRoutes />
          </SolanaProvider>
        </ClusterProvider>
      </QueryClientProvider>
    </HashRouter>
  )
}
