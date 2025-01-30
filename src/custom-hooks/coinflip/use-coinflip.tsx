/* eslint-disable @typescript-eslint/no-explicit-any */
import { useWallet } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { BN } from '@coral-xyz/anchor'
import { useCluster } from '@/custom-hooks/cluster/use-cluster'
import { useWager } from './use-wager'
import { useTransactionToast } from '../ui/use-transaction-toast'
import { useGetBalance } from '../account/use-get-balance'
import toast from 'react-hot-toast'

export function useCoinflip({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useWager();
  const wallet = useWallet()
  const balance = useGetBalance({ address: wallet.publicKey ?? Keypair.generate().publicKey });
  const payer = wallet.publicKey ?? Keypair.generate().publicKey;

  const accountQuery = useQuery({
    queryKey: ['wager', 'fetch', { cluster, account }],
    queryFn: () => program.account.wager.fetch(account),
  });

  const closeMutation = useMutation({
    mutationKey: ['wager', 'close', { cluster, account }],
    mutationFn: () => program.methods.closeWager().accounts({ wager: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
    onError: (e: any) => {
      if (e?.errorLogs?.[0]) {
        toast.error(e.errorLogs[0]);
        return;
      }
    }
  });

  const flipMutation = useMutation({
    mutationKey: ['coin', 'flip', { cluster, account }],
    mutationFn: () => {
      const [wager,] = PublicKey.findProgramAddressSync(
        [Buffer.from('wager'), payer.toBuffer()],
        program.programId
      );
      return program.methods.flip(new BN(2000000))
        .accounts({ payer, wager })
        .rpc();
    },
    onSuccess: (tx) => {
      transactionToast(tx);
      balance.refetch();
      return accountQuery.refetch();
    },
    onError: (e: any) => {
      if (e?.errorLogs?.[0]) {
        toast.error(e.errorLogs[0]);
        return;
      }
      if (e.transactionMessage) {
        toast.error(e.transactionMessage);
        return;
      }
    }
  });

  const betMutation = useMutation({
    mutationKey: ['coin', 'bet', { cluster, account }],
    mutationFn: () => {
      const [wager,] = PublicKey.findProgramAddressSync(
        [Buffer.from('wager'), payer.toBuffer()],
        program.programId
      );
      return program.methods.bet(new BN(1000000))
        .accounts({ payer, wager })
        .rpc();
    },
    onError: (e: any) => {
      if (e?.errorLogs?.[0]) {
        toast.error(e.errorLogs[0]);
        return;
      }
      if (e.transactionMessage) {
        toast.error(e.transactionMessage);
        return;
      }
    },
    onSuccess: (tx) => {
      transactionToast(tx);
      balance.refetch();
      return accountQuery.refetch();
    },
  });

  return {
    accountQuery,
    closeMutation,
    flipMutation,
    betMutation,
  }
}
