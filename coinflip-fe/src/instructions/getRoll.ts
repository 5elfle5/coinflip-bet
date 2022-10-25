import { Idl, Program } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

export async function getRoll(program: Program<Idl>, userPk: PublicKey): Promise<any> {
  const [wager,] = await PublicKey.findProgramAddress(
    [Buffer.from('wager'), userPk.toBuffer()],
    program.programId,
  );
  const account = await program.account.wager.fetch(wager);
  // @ts-ignore
  return account.roll.words[0];
}
