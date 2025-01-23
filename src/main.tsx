import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SolanaProvider } from './components/solana/solana-provider'
import './index.css'
import { ClusterProvider } from './components/cluster/cluster-provider'
import { UiLayout } from '@/components/ui/ui-layout'
import { lazy } from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const AccountListFeature = lazy(() => import('./components/account/account-list-feature'))
const AccountDetailFeature = lazy(() => import('./components/account/account-detail-feature'))

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
]

const routes: RouteObject[] = [
  { path: '/account/', element: <AccountListFeature /> },
  { path: '/account/:address', element: <AccountDetailFeature /> },
]

export function AppRoutes() {
  const router = useRoutes([
    { index: true, element: <Navigate to={'/account'} replace={true} /> },
    ...routes,
  ])
  return <UiLayout links={links}>{router}</UiLayout>
}


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
