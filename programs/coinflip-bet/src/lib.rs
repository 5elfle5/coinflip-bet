use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod coinflip_bet {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, data: i64) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = data;
        my_account.won = false;
        Ok(())
    }

    pub fn update(ctx: Context<Update>) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        let timestamp = Clock::get()?.unix_timestamp;
        let roll = ((timestamp + 7789) * 997) % 100;
        let won = roll < 49;
        my_account.data = roll;
        my_account.won = won;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8 + 1)]
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[account]
pub struct MyAccount {
    pub data: i64,
    pub won: bool,
}