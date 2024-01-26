import fs from 'node:fs'

export interface SaveFileOptions {
  fileContent: string
  fileDestination?: string
  fileName?: string
}

export interface SaveFileUseCase {
  execute: (options: SaveFileOptions) => boolean
}


export class SaveFile implements SaveFileUseCase {
  constructor(
    /**
     * DI - Dependency Injection
     */
  ) {

  }

  execute({fileContent, fileDestination = 'outputs', fileName = 'table'}: SaveFileOptions): boolean {
    try {

      fs.mkdirSync(fileDestination, {recursive: true})
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent)

      return true

    } catch (error) {

      console.error(error)

      return false
    }
  }
}