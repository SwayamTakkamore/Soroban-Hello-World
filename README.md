# Soroban Hello World

This project demonstrates a complete workflow for building, deploying, and interacting with a Soroban smart contract on the Stellar blockchain, including a modern web frontend.

## Project Structure

- **contracts/hello-world/**: Rust smart contract implementing a simple greeting function.
- **packages/hello-world/**: TypeScript client library for interacting with the contract.
- **hellowww/**: Next.js web application with interactive UI and animations.

## Smart Contract

The contract is written in Rust and provides a `hello` function:

```rust
pub fn hello(env: Env, to: String) -> Vec<String> {
	 vec![&env, String::from_str(&env, "Hello"), to]
}
```

## TypeScript Client

Generated using Soroban CLI, this client allows easy interaction with the deployed contract. The contract is deployed at:

```
CDSDYCYFEYJVPY5EGF6VD2JJYNZ4NPW274OULLAI6I3RL7SHPMVXSHEX
```
on the Stellar testnet.

## Web Frontend

The Next.js app provides:
- Form for user input
- Calls the contract via the TypeScript client
- Displays animated greeting response

## How to Run

1. **Build the contract:**
	```bash
	cd contracts/hello-world
	make build
	```
2. **Build the TypeScript client:**
	```bash
	cd packages/hello-world
	npm install
	npm run build
	```
3. **Run the frontend:**
	```bash
	cd hellowww
	npm install
	npm run dev
	```

## How It Works

1. User enters their name in the web app.
2. The app calls the contract's `hello` function via the client.
3. The contract returns a greeting, which is displayed with animations.

## Resources

- [Soroban Documentation](https://soroban.stellar.org/docs/)
- [Stellar Testnet](https://laboratory.stellar.org/)

---
This project is a template for building Soroban dApps with a modern frontend.