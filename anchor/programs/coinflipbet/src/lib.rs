#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;
use anchor_lang::system_program::{ transfer, Transfer };

mod structs;
use structs::*;

declare_id!("7PFuMxE8XdCY1RyKkfrqE29pHcdveHJ9sQV63rxCM8xx");

#[program]
pub mod coinflipbet {
    use super::*;

  pub fn initialize(ctx: Context<InitializeBankroll>) -> Result<()> {
    msg!("Bankroll PDA: {}", ctx.accounts.bankroll.key());
    msg!("Payer PDA: {}", ctx.accounts.payer.key());
    Ok(())
  }

  pub fn close_bankroll(_ctx: Context<CloseBankroll>) -> Result<()> {
    Ok(())
  }

  pub fn create_wager(_ctx: Context<CreateWager>) -> Result<()> {
    Ok(())
  }

  pub fn close_wager(_ctx: Context<CloseWager>) -> Result<()> {
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
    let to_pubkey = ctx.accounts.wager.to_account_info();
    let program_id = ctx.accounts.system_program.to_account_info();
    let user_pubkey = ctx.accounts.payer.to_account_info();
    let user_transaction_context = CpiContext::new(
      program_id.clone(),
      Transfer {
        from: user_pubkey,
        to: to_pubkey.clone(),
      },
    );
    transfer(user_transaction_context, amount)?;
    let from_pda = ctx.accounts.bankroll.clone();
    let to_account = ctx.accounts.wager.clone();
    **from_pda.to_account_info().lamports.borrow_mut() -= amount;
    **to_account.to_account_info().lamports.borrow_mut() += amount;
    let result = &mut ctx.accounts.wager;
    let timestamp = Clock::get()?.unix_timestamp;
    let roll = ((timestamp + 7789) * 997) % 100;
    let won = roll < 49;
    result.roll = roll;
    result.won = won;
    result.bet_on_side = 1;
    if !won {
      let bankroll_account = ctx.accounts.bankroll.clone();
      let wager_account = ctx.accounts.wager.clone();
      **wager_account.to_account_info().lamports.borrow_mut() -= amount * 2;
      **bankroll_account.to_account_info().lamports.borrow_mut() += amount * 2;
    }
    Ok(())
  }

  pub fn flip(ctx: Context<Update>, amount: u64) -> Result<()> {
    let result = &mut ctx.accounts.wager;
    if result.won {
      let user_account = ctx.accounts.payer.clone();
      let wager_account = ctx.accounts.wager.clone();
      **wager_account.to_account_info().lamports.borrow_mut() -= amount;
      **user_account.to_account_info().lamports.borrow_mut() += amount;
    }
    Ok(())
  }
}
