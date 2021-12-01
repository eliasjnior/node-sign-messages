import Table from 'cli-table';
import { sign, createPrivateKey } from 'crypto'
import inquirer from 'inquirer';

type SignMessageDto = {
  privateKey: string,
  message: string,
  encoding: 'base64' | 'hex'
}

const signMessage = async ({privateKey, message, encoding}: SignMessageDto) => {

  const privateKeyData = createPrivateKey({
    type: 'pkcs8',
    format: 'der',
    key: Buffer.from(privateKey, encoding),
  })
  
  const signature = sign(
    null, 
    Buffer.from(message), 
    privateKeyData
  )
  
  const table = new Table()

  table.push(['Private key', privateKey])
  table.push(['Message', privateKey])
  table.push(['Signature', signature.toString(encoding)])

  console.log(table.toString())
}

const bootstrap = async () => {
  try {
    const {privateKey, message, encoding} = await inquirer.prompt([
      {
        type: 'input',
        name: 'privateKey',
        message: 'Private key',
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

    await signMessage({privateKey, message, encoding})
  } catch(error){
    console.log('There was an error while signing message.')
  }
}

export default bootstrap