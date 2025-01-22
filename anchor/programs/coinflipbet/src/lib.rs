#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;
use anchor_lang::system_program::{ transfer, Transfer };

mod structs;
use structs::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod coinflipbet {
    use super::*;

  pub fn initialize(_ctx: Context<InitializeBankroll>) -> Result<()> {
    Ok(())
  }

  pub fn create_wager(_ctx: Context<CreateWager>) -> Result<()> {
    Ok(())
  }

  pub fn close(_ctx: Context<CloseCoinflipbet>) -> Result<()> {
    Ok(())
  }

  pub fn topup(ctx: Context<UpdateBankroll>, amount: u64) -> Result<()> {
    let from_pubkey = ctx.accounts.payer.to_account_info();
    let to_pubkey = ctx.accounts.bankroll.to_account_info();
    let program_id = ctx.accounts.system_program.to_account_info();

    let cpi_context = CpiContext::new(
      program_id,
      Transfer {
        from: from_pubkey,
        to: to_pubkey,
      },
    );

    transfer(cpi_context, amount)?;
    Ok(())
  }

  pub fn bet(ctx: Context<Update>, amount: u64) -> Result<()> {
    let from_pubkey = ctx.accounts.payer.to_account_info();
    let to_pubkey = ctx.accounts.wager.to_account_info();
    let program_id = ctx.accounts.system_program.to_account_info();
    let user_transaction_context = CpiContext::new(
      program_id.clone(),
      Transfer {
        from: from_pubkey,
        to: to_pubkey.clone(),
      },
    );

    transfer(user_transaction_context, amount)?;

    // let seeds = &[b"bankroll", crate::ID.as_ref(), &[ctx.bumps.bankroll]];
    // let signer_seeds = &[&seeds[..]];

    // let casino_pubkey = ctx.accounts.bankroll.to_account_info();
    // let casino_transaction_context = CpiContext::new_with_signer(
    //   program_id,
    //   Transfer {
    //       from: casino_pubkey,
    //       to: to_pubkey,
    //   },
    //   signer_seeds
    // );

    // transfer(casino_transaction_context, amount)?;

    ctx.accounts.wager.count = ctx.accounts.wager.count.checked_add(1).unwrap();
    ctx.accounts.wager.won = false;
    ctx.accounts.wager.bet_on_side = 1;
    ctx.accounts.wager.roll = 150;
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.wager.count = value.clone();
    Ok(())
  }
}
