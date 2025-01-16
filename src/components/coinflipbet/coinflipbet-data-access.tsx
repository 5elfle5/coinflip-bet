import { getCoinflipbetProgram, getCoinflipbetProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useCoinflipbetProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getCoinflipbetProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getCoinflipbetProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['coinflipbet', 'all', { cluster }],
    queryFn: () => program.account.coinflipbet.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['coinflipbet', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ coinflipbet: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useCoinflipbetProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useCoinflipbetProgram()

  const accountQuery = useQuery({
    queryKey: ['coinflipbet', 'fetch', { cluster, account }],
    queryFn: () => program.account.coinflipbet.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['coinflipbet', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ coinflipbet: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['coinflipbet', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ coinflipbet: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['coinflipbet', 'increment', { cluster, account }],
    mutationFn: () => program.methods.bet().accounts({ coinflipbet: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['coinflipbet', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ coinflipbet: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
