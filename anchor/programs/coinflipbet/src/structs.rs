use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Wager {
  pub roll: u32,
  pub won: bool,
  pub bet_on_side: u8,
  pub count: u8,
}

#[account]
#[derive(InitSpace)]
pub struct Bankroll {
}

#[derive(Accounts)]
pub struct CreateWager<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + 1 + 1 + 1 + 8,
  payer = payer,
  seeds = [b"wager", payer.key().as_ref()],
  bump
  )]
  pub wager: Account<'info, Wager>,

  pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitializeBankroll<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + 8,
  payer = payer,
  seeds = [b"bankroll", crate::ID.as_ref()],
  bump
  )]
  pub bankroll: Account<'info, Bankroll>,

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
  pub wager: Account<'info, Wager>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub wager: Account<'info, Wager>,
}

#[derive(Accounts)]
pub struct UpdateBankroll<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  seeds = [b"bankroll", crate::ID.as_ref()],
  bump
  )]
  pub bankroll: Account<'info, Bankroll>,

  pub system_program: Program<'info, System>,
}
