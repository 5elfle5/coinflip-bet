import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const AccountListFeature = lazy(() => import('../components/account/account-list-feature'))
const AccountDetailFeature = lazy(() => import('../components/account/account-detail-feature'))

export const links: { label: string; path: string }[] = [
  { label: 'Coinflip', path: '/account' },
]

export const routes: RouteObject[] = [
  { path: '/account/', element: <AccountListFeature /> },
  { path: '/coinflip', element: <AccountDetailFeature /> },
]
