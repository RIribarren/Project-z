const fs = require('fs');
const { Transform, Duplex, EventEmitter } = require('stream');
const { domainToASCII } = require('url');
/* Existen 4 tipos de streams:
    - Readable: desde donde se pueden leer datos.
    - Writable: desde donde se pueden escribir datos. 
    - Duplex: son streams que leen y escriben datos (Writable y Readable)
    - Transform: son streams Duplex que ademas pueden transformar los datos que leen y escriben

Los Streams responden a EventEmitter que es la clase con la que gestionamos eventos en Js 
*/

//Stream Readable:
/* let readableStream = fs.createReadStream(__dirname + '/lista_nombres.txt');

let data = '';

readableStream.on('data', (chunk) => {
    data += chunk;
    console.log(data);
})

readableStream.on('end', () => {
    console.log('Se termino de leer el archivo');
})
 */
//Stream writable:

/* let writableStream = fs.createWriteStream(__dirname + 'nueva_lista_nombres.txt');

writableStream.write('Lucas\n');
writableStream.write('Pedro\n');
writableStream.write('Karlo\n');

readableStream.pipe(writableStream).on('error', (error) => {
    console.log(error);
}) */

//el metodo pipe permite que se haga el roceso de lectura y escritura 

//Stream Transform 

let transformStream = new Transform();

let readableStreamListName = fs.createReadStream(__dirname + '/nueva_lista_nombres.txt');
let writableStreamUpperCaseList = fs.createWriteStream(__dirname + '/lista_nombres_mayuscula.txt');

transformStream._transform = (chunk, encoding, callback) => {
    transformStream.push(chunk.toString().toUpperCase());
    callback();
};

readableStreamListName.pipe(transformStream).pipe(writableStreamUpperCaseList);
