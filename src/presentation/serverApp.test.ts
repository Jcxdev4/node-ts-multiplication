import { CreateTable } from '../domain/use-cases/createTable';
import { SaveFile } from '../domain/use-cases/saveFile';
import { ServerApp } from './serverApp';


describe('Server App', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const options = {
    base: 3,
    limit: 3,
    showTable: false,
    fileDestination: 'test-destination',
    fileName: 'test-name'
  }

  test('Should create server app instance', () => {
    const serverApp = new ServerApp()

    expect(serverApp).toBeInstanceOf(ServerApp)
    expect(typeof ServerApp.run).toBe('function')
  })

  test('Should run server app with options', () => {
    const spyLog = jest.spyOn(console, 'log')
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute')
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute')

    ServerApp.run(options)

    expect(spyLog).toHaveBeenCalledTimes(2)
    expect(spyLog).toHaveBeenCalledWith('Servidor Corriendo!')
    expect(spyLog).toHaveBeenLastCalledWith('File created!')

    expect(createTableSpy).toHaveBeenCalledTimes(1)
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit
    })

    expect(saveFileSpy).toHaveBeenCalledTimes(1)
    expect(saveFileSpy).toHaveBeenCalledWith({
      // fileContent: expect.any(String),
      fileContent: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9",
      fileDestination: options.fileDestination,
      fileName: options.fileName
    })

    
  })

  test('Debe funcionar con Mocks personalizados', () => {

    const logMock = jest.fn()
    const errorMock = jest.fn()
    const createTableMock = jest.fn().mockReturnValue('1 x 10 = 10')
    const saveFileMock = jest.fn().mockReturnValue(true)

    console.log = logMock
    console.error = errorMock
    CreateTable.prototype.execute = createTableMock
    SaveFile.prototype.execute = saveFileMock

    ServerApp.run(options)

    expect(logMock).toHaveBeenCalledTimes(2)
    expect(logMock).toHaveBeenCalledWith('Servidor Corriendo!')
    expect(logMock).toHaveBeenLastCalledWith('File created!')
    expect(errorMock).not.toHaveBeenCalled()
    expect(createTableMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit })
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: "1 x 10 = 10",
      fileDestination: options.fileDestination,
      fileName: options.fileName
    })
  })

})