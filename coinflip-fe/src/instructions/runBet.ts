import { BN, Idl, Program } from '@project-serum/anchor';
import { PublicKey, SystemProgram } from '@solana/web3.js';

export async function runBet(
  publicKey: PublicKey,
  program: Program<Idl>,
): Promise<any> {
  const managerPk = new PublicKey('Wj2yvieAgeD4bXdAzkVTYiqDgA8ScJM2JPpayDaCfcx');
  const [systemAccount,] = await PublicKey.findProgramAddress(
    [Buffer.from('system-account'), managerPk.toBuffer()],
    program.programId,
  );
  const [wager,] = await PublicKey.findProgramAddress(
    [Buffer.from('wager'), publicKey.toBuffer()],
    program.programId,
  );
  await program.methods.bet(
    { side: 'heads', lamports: new BN(1000) },
  )
  .accounts(
    {
      wager,
      user: publicKey,
      systemAccount,
      systemProgram: SystemProgram.programId,
    }
  )
  .signers([])
  .rpc();
}
