# Coinflip bet

## How to run:

### install:

- node,
- rust+solana+anchor like here (https://solana.com/docs/intro/installation)
- phantom wallet chrome extension

### prepare solana & pnpm:

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

### run:

to run with a single command do:

`npm run dev`

to run everything separately do

`npm run anchor-localnet`

(if you see this error "no such command: build-sbf" do 
add

`PATH=~/.local/share/solana/install/active_release/bin:$PATH`

to .bashrc (or .zshrc if you use zsh))

in separate terminal tab do:

`ts-node init-script/src/init.ts`

`vite`
