use anchor_lang::{prelude::*};
use vipers::prelude::*;

mod account_validators;

declare_id!("6YQukxVDKejG79RNSddyeEy6YQRVNkXSi4f5HuEyVMd6");

#[error_code]
pub enum CustomError {
  #[msg("Insufficient Funds")]
  InsufficientFundsForTransaction,
}

#[program]
mod coinflip_bet {
  use super::*;
  #[access_control(ctx.accounts.validate())]
  pub fn init_system(ctx: Context<InitSystem>) -> Result<()> {
    ctx.accounts.system_account.bump = *ctx.bumps.get("system_account").unwrap();
    Ok(())
  }
  pub fn bet(ctx: Context<Bet>, bet_args: BetArgs) -> Result<()> {
    **ctx.accounts.user.try_borrow_mut_lamports()? -= bet_args.lamports;
    **ctx.accounts.system_account.to_account_info().try_borrow_mut_lamports()? -= bet_args.lamports;
    **ctx.accounts.wager.to_account_info().try_borrow_mut_lamports()? += bet_args.lamports * 2;
    let result = &mut ctx.accounts.wager;
    result.roll = -1;
    result.won = false;
    result.bet_on_side = if bet_args.side.eq_ignore_ascii_case("heads") { 1 } else { 0 };
    Ok(())
  }
  pub fn flip(ctx: Context<Flip>) -> Result<()> {
    let result = &mut ctx.accounts.wager;
    let timestamp = Clock::get()?.unix_timestamp;
    let roll = ((timestamp + 7789) * 997) % 100;
    let won = roll < 49;
    result.roll = roll;
    result.won = won;
    let amount = ctx.accounts.wager.to_account_info().lamports();
    let from_account = ctx.accounts.system_account.to_account_info();
    if **from_account.try_borrow_lamports()? < amount {
      return Err(anchor_lang::error!(CustomError::InsufficientFundsForTransaction));
    }
    if won {
      **from_account.try_borrow_mut_lamports()? -= amount;
      **ctx.accounts.user.to_account_info().try_borrow_mut_lamports()? += amount;
    } else {
      **from_account.try_borrow_mut_lamports()? -= amount;
      **ctx.accounts.system_account.to_account_info().try_borrow_mut_lamports()? += amount;
    }
    Ok(())
  }
}

#[account]
pub struct BetArgs {
  pub side: String,
  pub lamports: u64,
}

#[derive(Accounts)]
pub struct InitSystem<'info> {
  #[account(
    init,
    payer = manager,
    space = 8 + 1,
    seeds = [b"system-account", manager.key().as_ref()],
    bump
  )]
  pub system_account: Account<'info, Escrow>,
  #[account(mut)]
  pub manager: Signer<'info>,
  pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Bet<'info> {
  #[account(
    init,
    payer = user,
    space = 8 + 1,
    seeds = [b"wager", user.key().as_ref()],
    bump
  )]
  pub wager: Account<'info, FlipResult>,
  #[account(mut)]
  pub user: Signer<'info>,
  #[account(mut)]
  pub system_account: Account<'info, Escrow>,
  pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Flip<'info> {
  #[account(mut)]
  pub wager: Account<'info, FlipResult>,
  #[account(mut)]
  pub system_account: Account<'info, Escrow>,
  #[account(mut)]
  pub user: Signer<'info>,
}

#[account]
pub struct FlipResult {
  pub roll: i64,
  pub won: bool,
  pub bet_on_side: u8,
}

#[account]
pub struct Escrow {
  pub bump: u8,
}