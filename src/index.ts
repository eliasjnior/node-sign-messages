import inquirer from 'inquirer'
import generateKeys from './generate'
import signMessage from './sign'
import verifySignature from './verify'

const bootstrap = async () => {
  const {script} = await inquirer.prompt([
    {
      type: 'list',
      name: 'script',
      message: 'What you want to do?',
      choices: [
        {
          name: 'Generate keys',
          value: 'generateKeys',
        },
        {
          name: 'Sign message',
          value: 'signMessage',
        },
        {
          name: 'Verify signature',
          value: 'verifySignature',
        }
      ]
    }
  ])

  switch(script) {
    case 'generateKeys':
      await generateKeys()
      break
    case 'signMessage':
      await signMessage()
      break
    case 'verifySignature':
      await verifySignature()
      break
  }
}

bootstrap()