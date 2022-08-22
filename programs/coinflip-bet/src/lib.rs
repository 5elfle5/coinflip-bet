use anchor_lang::{prelude::*};
use vipers::prelude::*;

mod account_validators;

declare_id!("Ae1cbcDnNocF6yUSzMTr4wsMZDwhkj8sHfnM9ScYASn2");

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
        Ok(())
    }

    pub fn bet(ctx: Context<Bet>, side: String) -> Result<()> {
        let result = &mut ctx.accounts.flip_result;
        result.roll = -1;
        result.won = false;
        result.bet_on_side = if side.eq_ignore_ascii_case("heads") { 1 } else { 0 };
        Ok(())
    }

    pub fn flip(ctx: Context<Flip>) -> Result<()> {
        let result = &mut ctx.accounts.flip_result;
        let timestamp = Clock::get()?.unix_timestamp;
        let roll = ((timestamp + 7789) * 997) % 100;
        let won = roll < 49;
        result.roll = roll;
        result.won = won;
        if won {
            // TODO: fix the number
            let amount = 1000000;
            let from_account = ctx.accounts.system_account.to_account_info();
            if **from_account.try_borrow_lamports()? < amount {
                return Err(anchor_lang::error!(CustomError::InsufficientFundsForTransaction));
            }
            **from_account.try_borrow_mut_lamports()? -= amount;
            **ctx.accounts.user.to_account_info().try_borrow_mut_lamports()? += amount;
        }
        Ok(())
    }
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
    pub wager: Account<'info, Escrow>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        init,
        payer = user,
        space = 8 + 8 + 1 + 1,
        seeds = [b"flip-result", user.key().as_ref()],
        bump
    )]
    pub flip_result: Account<'info, FlipResult>,
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
pub struct Flip<'info> {
    #[account(mut)]
    pub system_account: Account<'info, Escrow>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub flip_result: Account<'info, FlipResult>,
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