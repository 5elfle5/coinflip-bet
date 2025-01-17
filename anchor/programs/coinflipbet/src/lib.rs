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

  pub fn bet(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.coinflipbet.count = ctx.accounts.coinflipbet.count.checked_add(1).unwrap();
    ctx.accounts.coinflipbet.won = false;
    ctx.accounts.coinflipbet.bet_on_side = 1;
    ctx.accounts.coinflipbet.roll = 150;
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

#[account]
#[derive(InitSpace)]
pub struct FlipResult {
  pub roll: i64,
  pub won: bool,
  pub bet_on_side: u8,
}

#[derive(Accounts)]
pub struct InitializeCoinflipbet<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + 1 + 1 + 1 + 8,
  payer = payer,
  seeds = [b"coinflip", payer.key().as_ref()],
  bump
  )]
  pub coinflipbet: Account<'info, Coinflipbet>,

  #[account(
  init,
  space = 8 + 8,
  payer = payer,
  seeds = [b"wager", crate::ID.as_ref()],
  bump
  )]
  pub wager: Account<'info, Wager>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseCoinflipbet<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer,
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
  pub roll: u32,
  pub won: bool,
  pub bet_on_side: u8,
  pub count: u8,
}

#[account]
#[derive(InitSpace)]
pub struct Wager {
  pub count: u8,
}
