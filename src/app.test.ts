import { ServerApp } from "./presentation/serverApp"


describe('app.ts', () => {
  test('Should call Server.run with values', async() => {
    
    // Mock ficticio para la prueba
    const serverAppMock = jest.fn()
    ServerApp.run = serverAppMock

    // Pasar los argumentos por argv
    process.argv = ['node', 'app.ts', '-b', '5', '-l', '10', '-s', '-d', 'test-destination', '-n', 'test-name']

    // Importar el app para que absorba los argumentos
    await import('./app')

    // La prueba
    expect(serverAppMock).toHaveBeenCalledWith({
      base: 5,
      limit: 10,
      showTable: true,
      fileDestination: 'test-destination',
      fileName: 'test-name'
    })
  })
})
