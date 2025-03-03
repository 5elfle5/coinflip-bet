import { ReactNode, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Link, useLocation } from 'react-router-dom'
import { AccountChecker } from '../account/account-checker'
import { ClusterChecker } from '../cluster/cluster-checker'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
// import { ClusterUiSelect } from '../cluster/cluster-ui-select'
import { useCluster } from '@/custom-hooks/cluster/use-cluster'

export function UiLayout({ children, links }: { children: ReactNode; links: { label: string; path: string }[] }) {
  const { cluster } = useCluster()
  const pathname = useLocation().pathname

  return (
    <div className="h-full flex flex-col">
      <div className="navbar bg-base-300 text-neutral-content flex-col md:flex-row space-y-2 md:space-y-0">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" to="/">
            <img className="h-4 md:h-6" alt="Logo" src="/logo.png" />
          </Link>
          <ul className="menu menu-horizontal px-1 space-x-2">
            {links.map(({ label, path }) => (
              <li key={path}>
                <Link className={pathname.startsWith(path) ? 'active' : ''} to={path}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-none space-x-2">
          <WalletMultiButton />
          <div className='px-4'>
            {cluster.name}
          </div>
          {/* <ClusterUiSelect /> */}
        </div>
      </div>
      <ClusterChecker>
        <AccountChecker />
      </ClusterChecker>
      <div className="flex-grow mx-4 lg:mx-auto">
        <Suspense
          fallback={
            <div className="text-center my-32">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
        >
          {children}
        </Suspense>
        <Toaster position="bottom-right" />
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>
            Source code at{' '}
            <a
              className="link hover:text-white"
              href="https://github.com/5elfle5/coinflip-bet"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
          </p>
        </aside>
      </footer>
    </div>
  )
}
