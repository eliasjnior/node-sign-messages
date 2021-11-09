import {verify, createPublicKey} from 'crypto'

const validate = async (pk: string, signature: string, message: string) => {
  const pkBuffer = Buffer.from(pk, 'hex')
  const signatureBuffer = Buffer.from(signature, 'hex')

  const publicKey = createPublicKey({
    type: 'spki',
    format: 'der',
    key: pkBuffer,
  })

  const verified = verify(
    null, 
    Buffer.from(message), 
    publicKey, 
    signatureBuffer,
  )

  console.log('verified: ', verified)

  return verified
}

validate(process.argv[2], process.argv[3], process.argv[4])