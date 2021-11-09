import { sign, generateKeyPairSync } from 'crypto'

const generate = async (message: string) => {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');

  const privateKeyExport = privateKey.export({
    format: 'der',
    type: 'pkcs8',
  })

  const publicKeyExport = publicKey.export({
    format: 'der',
    type: 'spki'
  })

  const privateKeyBs58 = privateKeyExport.toString('hex')
  const publicKeyBs58 = publicKeyExport.toString('hex')
  
  const signature = sign(
    null, 
    Buffer.from(message), 
    privateKey
  )
  
  console.log('private key:', privateKeyBs58)
  console.log('public key hex:', publicKeyBs58)
  console.log('signature:', signature.toString('hex'))

  return signature
}

generate(process.argv[2])