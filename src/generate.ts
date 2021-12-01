import { generateKeyPairSync } from 'crypto'
import Table from 'cli-table';
import inquirer from 'inquirer';

const generate = async (encoding: 'base64' | 'hex') => {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');

  const privateKeyExport = privateKey.export({
    format: 'der',
    type: 'pkcs8',
  })

  const publicKeyExport = publicKey.export({
    format: 'der',
    type: 'spki'
  })

  const privateKeyOutput = privateKeyExport.toString(encoding)
  const publicKeyOutput = publicKeyExport.toString(encoding)

  const table = new Table({
    head: ['Type', 'Value'],
  })
  
  table.push(['Private key', privateKeyOutput])
  table.push(['Public key', publicKeyOutput])
  
  console.log(table.toString())
}

const bootstrap = async () => {
  const {encoding} = await inquirer.prompt([
    {
      type: 'list',
      name: 'encoding',
      message: 'Encoding',
      default: 'base64',
      choices: ['base64', 'hex']
    }
  ])

  await generate(encoding)
}

bootstrap()