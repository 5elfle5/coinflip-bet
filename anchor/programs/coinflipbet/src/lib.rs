#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod coinflipbet {
    use super::*;

  pub fn close(_ctx: Context<CloseCoinflipbet>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.coinflipbet.count = ctx.accounts.coinflipbet.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.coinflipbet.count = ctx.accounts.coinflipbet.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeCoinflipbet>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.coinflipbet.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeCoinflipbet<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Coinflipbet::INIT_SPACE,
  payer = payer
  )]
  pub coinflipbet: Account<'info, Coinflipbet>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseCoinflipbet<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub coinflipbet: Account<'info, Coinflipbet>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub coinflipbet: Account<'info, Coinflipbet>,
}

#[account]
#[derive(InitSpace)]
pub struct Coinflipbet {
  count: u8,
}
