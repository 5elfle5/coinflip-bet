import { getCoinflipbetProgram, getCoinflipbetProgramId } from '@project/anchor'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'
import { BN } from '@coral-xyz/anchor'

export function useCoinflipbetProgram() {
  const payer = useWallet()?.publicKey ?? Keypair.generate().publicKey;
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getCoinflipbetProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getCoinflipbetProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['coinflipbet', 'all', { cluster }],
    queryFn: () => program.account.wager.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const createWager = useMutation({
    mutationKey: ['wager', 'create', { cluster }],
    mutationFn: () => {
      return program.methods.createWager().accounts({
        payer,
      }).rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: (e) => toast.error(JSON.stringify(e)),
  })

  const closeWager = useMutation({
    mutationKey: ['wager', 'close', { cluster }],
    mutationFn: () => {
      const [wager,] = PublicKey.findProgramAddressSync(
        [Buffer.from('wager'), payer.toBuffer()],
        program.programId
      );
      return program.methods.closeWager().accounts({
        payer,
        wager
      }).rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: (e) => toast.error(JSON.stringify(e)),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createWager,
    closeWager
  }
}

export function useCoinflipbetProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useCoinflipbetProgram();
  const wallet = useWallet()
  const payer = wallet.publicKey ?? Keypair.generate().publicKey;

  const accountQuery = useQuery({
    queryKey: ['coinflipbet', 'fetch', { cluster, account }],
    queryFn: () => program.account.wager.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['coinflipbet', 'close', { cluster, account }],
    mutationFn: () => program.methods.closeWager().accounts({ wager: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['coinflipbet', 'decrement', { cluster, account }],
    mutationFn: () => {
      const [wager,] = PublicKey.findProgramAddressSync(
        [Buffer.from('wager'), payer.toBuffer()],
        program.programId
      );
      return program.methods.flip(new BN(200000000))
        .accounts({ payer, wager })
        .rpc();
    },
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['coinflipbet', 'increment', { cluster, account }],
    mutationFn: () => {
      const [wager,] = PublicKey.findProgramAddressSync(
        [Buffer.from('wager'), payer.toBuffer()],
        program.programId
      );

      return program.methods.bet(new BN(100000000))
        .accounts({ payer, wager })
        .rpc();
    },
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['coinflipbet', 'set', { cluster, account }],
    //topup should be accessible to end user
    mutationFn: (value: number) => program.methods.topup(value).accounts({ payer: account }).rpc(),
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
