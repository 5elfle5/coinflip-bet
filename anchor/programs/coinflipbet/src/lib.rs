#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

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

  pub fn decrement(ctx: Context<UpdateBankroll>) -> Result<()> {
    ctx.accounts.bankroll.count = ctx.accounts.bankroll.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn bet(ctx: Context<Update>) -> Result<()> {
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
