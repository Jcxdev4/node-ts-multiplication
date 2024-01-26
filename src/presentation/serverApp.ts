import { CreateTable } from "../domain/use-cases/createTable"
import { SaveFile } from "../domain/use-cases/saveFile"

export interface RunOptions {
  base: number
  limit: number
  showTable: boolean
  fileDestination: string
  fileName: string
}

export class ServerApp {

  static run({limit, base, showTable, fileDestination, fileName}: RunOptions) {
    console.log('Server running...!')

    const table = new CreateTable()
      .execute({
        base,
        limit
      })

    const saveTable = new SaveFile()
      .execute({
        fileContent: table,
        fileDestination,
        fileName 
      })

    if(saveTable) console.log('File Created!!')
    else console.error('File Not Created')

    if(showTable) console.log(table)
  }
}