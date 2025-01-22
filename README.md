# Coinflip bet

## How to run:

### Prerequisites:

install:

* node,
* rust+solana+anchor like here (https://solana.com/docs/intro/installation)
* phantom wallet chrome extension

- create solana keys
- set solana cluster to local
- activate pnpm:

`corepack enable`

`corepack prepare pnpm@9 --activate`

- install ts-node

`npm i -g ts-node`

- install & build

`pnpm install`

`pnpm build`

`cd init-script`

`npm install`

- run

`npm run anchor-localnet`

(if you see this error "no such command: build-sbf" do 
add

`PATH=~/.local/share/solana/install/active_release/bin:$PATH`

to .bashrc (or .zshrc if you use zsh))

in an other tab do

`solana airdrop 3 8rAzBfiAhTseoJZGyfijc4WFWFwTvZfgBXtNNDaX5qP7`

(this is the pubkey for the keys inside init-script, you can generate your own keys)

`ts-node init-script/src/init.ts`

`npm run dev`
