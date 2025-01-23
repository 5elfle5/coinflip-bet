import { useWallet } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { BN } from '@coral-xyz/anchor'
import { useCluster } from '@/custom-hooks/cluster/use-cluster'
import { useTransactionToast } from '@/components/ui/ui-layout'
import { useWager } from './use-wager'

export function useCoinflip({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useWager();
  const wallet = useWallet()
  const payer = wallet.publicKey ?? Keypair.generate().publicKey;

  const accountQuery = useQuery({
    queryKey: ['wager', 'fetch', { cluster, account }],
    queryFn: () => program.account.wager.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['wager', 'close', { cluster, account }],
    mutationFn: () => program.methods.closeWager().accounts({ wager: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const flipMutation = useMutation({
    mutationKey: ['coin', 'flip', { cluster, account }],
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

  const betMutation = useMutation({
    mutationKey: ['coin', 'bet', { cluster, account }],
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

  return {
    accountQuery,
    closeMutation,
    flipMutation,
    betMutation,
  }
}
