import { AnchorProvider, BN, setProvider, workspace } from '@project-serum/anchor';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';

require('dotenv').config();
const MANAGER = process.env.MANAGER ?? '';

describe("coinflip-bet", () => {
  const provider = AnchorProvider.local();
  setProvider(provider);

  it("initiates system account", async () => {
    // const program = workspace.CoinflipBet;
    // const managerKeys = Keypair.fromSecretKey(new Uint8Array(JSON.parse(MANAGER)));
    // const [systemAccount,] = await PublicKey.findProgramAddress(
    //   [Buffer.from("system-account"), managerKeys.publicKey.toBuffer()],
    //   program.programId
    // );
    // await program.rpc.initSystem({
    //   accounts: {
    //     systemAccount,
    //     manager: managerKeys.publicKey,
    //     systemProgram: SystemProgram.programId,
    //   },
    //   signers: [managerKeys],
    // });

    // const account = await program.account.flipResult.fetch(flipResult.publicKey);
    // assert.ok(account.roll.eq(new BN(1234)));
    // _flipResult = flipResult;
  });

  it("runs bet", async () => {
    const program = workspace.CoinflipBet;
    const userKeys = Keypair.generate();
    // const managerPk = new PublicKey('Wj2yvieAgeD4bXdAzkVTYiqDgA8ScJM2JPpayDaCfcx');
    const managerKeys = Keypair.fromSecretKey(new Uint8Array(JSON.parse(MANAGER)));
    const [systemAccount,] = await PublicKey.findProgramAddress(
      [Buffer.from("system-account"), managerKeys.publicKey.toBuffer()],
      program.programId
    );
    await program.rpc.initSystem({
      accounts: {
        systemAccount,
        manager: managerKeys.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [managerKeys],
    });
    const [wager,] = await PublicKey.findProgramAddress(
      [Buffer.from('wager'), userKeys.publicKey.toBuffer()],
      program.programId,
    );
    const betArgs = {
      side: 'heads',
      lamports: new BN(1000),
    }
    await program.rpc.bet(betArgs, {
      accounts: {
        wager,
        user: userKeys.publicKey,
        systemAccount,
        systemProgram: SystemProgram.programId,
      },
      signers: [userKeys]
    });
    // const flipResult = _flipResult;
    // const program = workspace.CoinflipBet;
    // await program.rpc.update({
    //   accounts: {
    //     flipResult: flipResult.publicKey,
    //   },
    // });
    // const account = await program.account.flipResult.fetch(flipResult.publicKey);
    // console.log("account data");
    // console.log(account.roll);
    // console.log(account.won);
  });
});