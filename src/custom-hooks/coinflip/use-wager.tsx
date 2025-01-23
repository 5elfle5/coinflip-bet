import { getCoinflipbetProgram, getCoinflipbetProgramId } from '@project/anchor'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '@/custom-hooks/cluster/use-cluster'
import { useTransactionToast } from '@/components/ui/ui-layout'
import { useAnchorProvider } from '../solana/use-anchor-provider'

export function useWager() {
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
