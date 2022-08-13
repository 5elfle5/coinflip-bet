use anchor_lang::prelude::*;
use vipers::prelude::*;

mod account_validators;

declare_id!("Ae1cbcDnNocF6yUSzMTr4wsMZDwhkj8sHfnM9ScYASn2");

#[program]
mod coinflip_bet {
    use anchor_lang::solana_program::system_instruction;

    use super::*;

    #[access_control(ctx.accounts.validate())]
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        system_instruction::transfer(&ctx.accounts.user.key(), &ctx.accounts.wager.key(), 1000);
        Ok(())
    }

    pub fn update(ctx: Context<Update>) -> Result<()> {
        let my_account = &mut ctx.accounts.flip_result;
        let timestamp = Clock::get()?.unix_timestamp;
        let roll = ((timestamp + 7789) * 997) % 100;
        let won = roll < 49;
        my_account.roll = roll;
        my_account.won = won;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 1,
        seeds = [b"wager", user.key().as_ref()],
        bump
    )]
    pub wager: Account<'info, Wager>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub flip_result: Account<'info, FlipResult>,
}

#[account]
pub struct FlipResult {
    pub roll: i64,
    pub won: bool,
}

#[account]
pub struct Wager {
    pub bump: u8,
}