import fs from 'node:fs'
import { yarg } from './config/plugins/yargsPlugins'

const {b:base, l:limit, s:showTable} = yarg

const headerMessage: string = `
====================================
         Tabla del ${base}
====================================
`
const filePath: string = 'outputs'
let impresion: string = ''

for(let i = 1; i <= limit; i++) {
  impresion += `${base} x ${i} = ${base * i}\n`
}

fs.mkdirSync('outputs', {recursive: true})
fs.writeFile(`${filePath}/tabla-${base}.txt`, impresion, 'utf-8', () => {
  console.log('File Created!!')
})

impresion = headerMessage + impresion

if(showTable) {
  console.log(impresion)
}