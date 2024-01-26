import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'

export const yarg = yargs(hideBin(process.argv))
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Multiplication table base'
  })
  .option('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    describe: 'Multiplication table limit'
  })
  .option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Show the multiplication table'
  })
  .option('d', {
    alias: 'destination',
    type: 'string',
    default: 'outputs',
    describe: 'Name of the Directory destination'
  })
  .option('n', {
    alias: 'fileName',
    type: 'string',
    default: 'table',
    describe: 'Name of the File'
  })
  .check((argv, options) => {

    if(argv.b < 1) throw 'Error: base must be a number'

    if(argv.l < 1) throw 'Limit: base must be a number'

    return true
  })
  .parseSync()




