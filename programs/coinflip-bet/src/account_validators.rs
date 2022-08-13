use crate::*;
use std::str::FromStr;

impl<'info> Validate<'info> for Initialize<'info> {
    fn validate(&self) -> Result<()> {
        assert_keys_eq!(self.user, Pubkey::from_str("Wj2yvieAgeD4bXdAzkVTYiqDgA8ScJM2JPpayDaCfcx").unwrap());
        Ok(())
    }
}