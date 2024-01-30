import { SaveFile } from './saveFile';
import fs from 'node:fs';

describe('SaveFileUseCase', () => {
  // Scopes Globales
  const customOptions = {
    fileContent: 'test-contenttt',
    fileDestination: 'customOutputs',
    fileName: 'customFile'
  }

  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`
  
  afterEach(() => {
    const outputFolderExist = fs.existsSync('outputs')
    if(outputFolderExist) fs.rmSync('outputs', {recursive: true}) // Despues del test borra la carpeta 

    const customFolderExist = fs.existsSync(customOptions.fileDestination)
    if(customFolderExist) fs.rmSync(customOptions.fileDestination, { recursive: true })
  })

  test('Should save file with default values', () => {
    // Inicizalizacion
    const options = {
      fileContent: 'Algo para prueba'
    }
    
    const saveFile = new SaveFile()
    const filePath = 'outputs/table.txt'

    // Ejecucion
    const saveFileResult = saveFile.execute(options)
    const checkFile = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'})
    
    expect(saveFile).toBeInstanceOf(SaveFile)
    expect(saveFileResult).toBe(true)
    expect(checkFile).toBeTruthy()
    expect(fileContent).toBe(options.fileContent)
  })

  test('Should save file with custom values', () => {
    const saveFile = new SaveFile()

    const saveFileResult = saveFile.execute(customOptions)
    const checkFile = fs.existsSync(customFilePath)
    const fileContent = fs.readFileSync(customFilePath, {encoding: 'utf-8'})

    expect(saveFileResult).toBe(true)
    expect(checkFile).toBeTruthy()
    expect(fileContent).toBe(customOptions.fileContent)

  })

  test('Should retur false if directory could not be created.', () => {
    const saveFile = new SaveFile()
    const errorTest = 'Error testing example'

    const mkDirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error(errorTest)
    })

    const file = saveFile.execute(customOptions)

    expect(mkDirSpy).toHaveBeenCalled()
    expect(file).toBe(false)
    expect(mkDirSpy).toThrow(errorTest)

    mkDirSpy.mockRestore() // restaura la funcion afectada por el Mock
  })

  test('Should retur false if directory could not be created.', () => {
    const saveFile = new SaveFile()
    const errorTest = 'Error testing writeFile'

    const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error(errorTest)
    })

    const file = saveFile.execute(customOptions)

    expect(writeFileSpy).toHaveBeenCalled()
    expect(file).toBe(false)
    expect(writeFileSpy).toThrow(errorTest)

    writeFileSpy.mockRestore()
  })
})