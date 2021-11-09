# SSH Keys

## Generate SSH keys

```
ssh-keygen -o -a 100 -t ed25519 -f src/config/key -C "<YOUR COMMENT>"
```

## Get public key

```
ssh-keygen -y -f src/config/key > src/config/key.pub
```

## Scripts

### Generate

```
yarn start:generate "YOUR MESSAGE"
```

The output will be something like this:

```
private key bs58: 2mWNaEKEJrtB1rEvHsFx8aA4ypdQwBcw7YkL8AbpUcn5MP5tGRBiqRiCErD8WqiH6x
public key hex: GfHq2tTVk9z4eXgySufQKzi5fiJugciH5EkPjRCdLFSVmnVGLiA3V2dNvcFk
signature bs58: 2vXnDHccfcSDqZ6ny7tFP1DU1oMxZn18tmzMba4o93BsojnjkihPVKugC3qYGbtx8JRonsk1SgvtAK36qUCa2v8a
```

### Validate

`yarn start:validate PUBLIC_KEY SIGNATURE YOUR_MESSAGE`

```
yarn start:validate GfHq2tTVk9z4eXgySufQKzi5fiJugciH5EkPjRCdLFSVmnVGLiA3V2dNvcFk 2vXnDHccfcSDqZ6ny7tFP1DU1oMxZn18tmzMba4o93BsojnjkihPVKugC3qYGbtx8JRonsk1SgvtAK36qUCa2v8a "YOUR MESSAGE"
```