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

- run

`pnpm install`

`pnpm build`

`npm run anchor-localnet`

(if you see this error "no such command: build-sbf" do `export PATH=~/.local/share/solana/install/active_release/bin:$PATH`)

in an other tab do

`npm run dev`
