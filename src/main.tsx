import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SolanaProvider } from './components/solana/solana-provider'
import { AppRoutes } from './app/app-routes'
import './index.css'
import { ClusterProvider } from './components/cluster/cluster-provider'

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <ClusterProvider>
          <SolanaProvider>
            <AppRoutes />
          </SolanaProvider>
        </ClusterProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
