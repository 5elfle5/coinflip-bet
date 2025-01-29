# Coinflip bet

## How to run:

### install software:

- node,
- rust+solana+anchor like here (https://solana.com/docs/intro/installation)
- phantom wallet chrome extension

### prepare:

- create solana keys
- set solana cluster to localnet
- activate pnpm:

`corepack enable`

`corepack prepare pnpm@9 --activate`

- install ts-node and vite

`npm i -g ts-node`

`npm i -g vite`

- install & build

`pnpm install`

`pnpm build`

`cd init-script`

`npm install`

- switch to localnet (currently not needed, currently already on localnet)

(find usages of https://api.devnet.solana.com in the project and replace them with http://localhost:8899)

- update path to keys.json in init.ts (line 11)

- uncomment ClusterUiSelect in ui-layout.tsx

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

`ts-node scripts/init.ts`

`vite`
