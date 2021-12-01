import chalk from 'chalk'
import Table from 'cli-table'
import {verify, createPublicKey} from 'crypto'
import inquirer from 'inquirer'

type VerifyMessageDto = {
  publicKey: string,
  signature: string,
  message: string,
  encoding: 'base64' | 'hex'
}

const verifyMessage = async ({
  publicKey,
  signature,
  message,
  encoding,
}: VerifyMessageDto) => {
  const publicKeyData = createPublicKey({
    type: 'spki',
    format: 'der',
    key: Buffer.from(publicKey, encoding),
  })

  const verified = verify(
    null, 
    Buffer.from(message), 
    publicKeyData, 
    Buffer.from(signature, encoding),
  )

  const table = new Table()

  table.push(['Public key', publicKey])
  table.push(['Message', message])
  table.push(['Verification', verified ? chalk.green('valid') : chalk.red('invalid') ])

  console.log(table.toString())
}

const bootstrap = async () => {
  try {
    const {publicKey, signature, message, encoding} = await inquirer.prompt([
      {
        type: 'input',
        name: 'publicKey',
        message: 'Public key',
      },
      {
        type: 'input',
        name: 'signature',
        message: 'Signature',
      },
      {
        type: 'input',
        name: 'message',
        message: 'Message',
      },
      {
        type: 'list',
        name: 'encoding',
        message: 'Encoding',
        default: 'base64',
        choices: ['base64', 'hex']
      }
    ])

    await verifyMessage({publicKey, signature, message, encoding})
  } catch(error){
    console.log('There was an error while verifying signature.')
  }
}

export default bootstrap