import chalk from 'chalk'
import { CreateTable } from './createTable'


describe('createTableUseCase', () => {
  
  test('Should createTable with default values', () => {
    const createTable = new CreateTable()
    const table = createTable.execute({base: 2})

    // console.log(table)
    expect(createTable).toBeInstanceOf(CreateTable)
    expect(table).toContain('2 x 1 = 2')
    expect(table).toContain('2 x 10 = 20')
    // expect(table).toContain(`${chalk.red.bold('2')} x ${chalk.red.bold('1')} = ${chalk.green('2')}`) // con chalk
    // expect(table).toContain(`${chalk.red.bold('2')} x ${chalk.red.bold('10')} = ${chalk.green('20')}`) // con chalk
  })

  test('Should create table with custom values', () => {
    const options = {
      base: 4,
      limit: 20
    }

    const {base, limit} = options

    const createTable = new CreateTable()
    const table = createTable.execute(options)
    const rows = table.split('\n')

    expect(table).toContain(`4 x 1 = 4`)
    expect(table).toContain(`4 x 10 = 40`)
    expect(table).toContain(`${base} x ${limit} = ${base * limit}`)
    expect(rows.length).toBe(limit)
  })
})