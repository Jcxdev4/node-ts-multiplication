// import chalk from "chalk"

interface CreateTableOptions {
  base: number
  limit?: number
}

interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string
}

export class CreateTable implements CreateTableUseCase {
  constructor(
    /**
     * DI - Dependency Injection
     */
  ) {

  }

  execute({base, limit = 10}: CreateTableOptions) {
    let impresion = ''

    for(let i = 1; i <= limit; i++) {
      // impresion += `${chalk.red.bold(base)} x ${chalk.red.bold(i)} = ${chalk.green(base * i)}`
      impresion += `${base} x ${i} = ${base * i}`

      if(i < limit) impresion += '\n'
    }

    return impresion
  }
}