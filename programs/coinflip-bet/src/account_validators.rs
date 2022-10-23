use crate::*;
use std::str::FromStr;

impl<'info> Validate<'info> for InitSystem<'info> {
    fn validate(&self) -> Result<()> {
        assert_keys_eq!(self.manager, Pubkey::from_str("Wj2yvieAgeD4bXdAzkVTYiqDgA8ScJM2JPpayDaCfcx").unwrap());
        Ok(())
    }
}