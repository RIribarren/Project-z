//Diferentes formas de crear un buffer
let buffer1 = Buffer.alloc(10); //crea un buffer y le asigna un tamaño
console.log('Buffer creado con ALLOC', buffer1)

let buffer2 = Buffer.from([1,2,3,4]); //crea un buffer a partir de un elemento que le pasamos
console.log('Buffer creado con ALLOC', buffer2)

//Escribir data en el buffer
buffer1.write('Proyecto Z');
console.log('Escribiendo el buffer con .write ', buffer1);

// Leer data que tiene el buffer 
let dataBuffer = buffer1.toString(); //usa por defecto utf-8
console.log('Data leida: ', dataBuffer);

//Chequear si el objeto es un buffer o no
console.log('Es un Buffer: ', Buffer.isBuffer(buffer1));

// Ver longitud de un buffer
console.log(buffer1.length);

//Copiar buffer
let bufferA = Buffer.from('ABC');
let bufferB = Buffer.alloc(3);
bufferA.copy(bufferB)

let Data = bufferB.toString();
console.log('Se copio en el bufferB: ', Data);

// Recortar buffer
let bufferOld = Buffer.from('Proyecto Z');
let bufferNew = bufferOld.slice(0, 8);
console.log('Buffer recortado: ', bufferNew.toString());

// Concatenar 2 buffers

let bufferOne = Buffer.from('Proyecto ');
let bufferTwo = Buffer.from('Z ');
let bufferThree = Buffer.concat([bufferOne, bufferTwo]);
console.log('buffers concatenados: ', bufferThree.toString());






