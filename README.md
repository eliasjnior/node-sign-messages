# SSH Keys

Generate a key pair ED25519 to sign and verify messages in Node.

## Build

```bash
yarn install
yarn build
```

## Generate keys
You will be prompted to choose the encoding (base64 or hex).

```bash
yarn generate
```

## Sign message
You will be prompted to choose the encoding (base64 or hex). You will also need to input the message to be signed and the private key that was generated with the same encoding.

```bash
yarn sign
```

## Verify signature
You will be prompted to choose the encoding (base64 or hex). You will also need to input the message, signature and the public key that was generated with the same encoding.

```bash
yarn verify
```
