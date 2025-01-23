import { UiLayout } from '@/components/ui/ui-layout'
import { links, routes } from '@/constants/routes'
import { Navigate, useRoutes } from 'react-router-dom'

export function AppRoutes() {
  const router = useRoutes([
    { index: true, element: <Navigate to={'/account'} replace={true} /> },
    ...routes,
  ])
  return <UiLayout links={links}>{router}</UiLayout>
}
