Bet on a coin flip

I recommend to run it on Linux or Mac OS, it was not too hard to install environment on Manjaro Linux, on a Mac with M1 i had to use Rosetta, there was a tutorial somewhere
Pre-requisites: install rust, solana cli, anchor cli, create solana wallet, set solana cluster to 127.0.0.1:8899, airdrop some SOLs, install Phantom Wallet in your browser, send some SOLs there

Hard reset to "fixed deprecated method commit"
go to Anchor.toml, set correct "wallet" variable (set path to json of your wallet)
in root directory "cargo build", "yarn install", "anchor build"
in coinflip-fe directory "yarn install", "yarn build"
in any directory "solana-test-validator"
in root directory "anchor deploy"
find and replace in project program id (can be found in Anchor.toml, field coinflip_bet) with the one that anchor deploy created
anchor deploy again
in coinflip-fe "yarn start"
open localhost:1234, there will be log in with Phantom wallet and 2 stupid button, you can click left one and then the right one
What this did: it ran a smart contract and then read the account with the newly set data. But this is super primitive thing. This project is in very early stage, and I don't know if I will work on it, because I will be working on a job from Aug 22nd.

My next plans were:

add ability to transfer SOLs withint the smart contract
add animation of coinflip, together with choosing amount of money to bet, and a side to bet on
start coinflip animation together with calling a smart contract and then reading the account for results, when results are known stop the animation with a given result.
Account will just tell you if you won of lost. Probability to win will be 48%.
But, I believe that the smart contract is actually not secure, so my final step was supposed to be implement the hack that will allow to win every time

(this was written from memory, there might be step missing, or something)