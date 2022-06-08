import chalk from 'chalk'
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { write } from './jsFiles/write.js';
import { print } from './jsFiles/print.js';
import { compareFileSizes } from './jsFiles/compareFileSizes.js';
import { move } from './jsFiles/move.js';
import { getDirectorySize } from './jsFiles/getDirectorySize.js';
import { watch } from './jsFiles/watcher.js';
import { unionFiles, reverse, touch, getTypes, getDirSize, exchange} from './jsFiles/file.js';
import { wait } from './jsFiles/timer.js';
import { getBadLinks } from './jsFiles/checker.js';

const __filename = fileURLToPath(import.meta.url);  // index.js
const __dirname = path.dirname(__filename);  // async 


console.log(chalk.bgBlue(__filename)); // D:\торрент\www\test-electron\async\index.js
console.log(chalk.bgGreen(__dirname)); // D:\торрент\www\test-electron\async

console.log("Название файла: ", path.basename(__filename)); // index.js
console.log("Имя директории: ", path.basename(__dirname)); // async
console.log(chalk.bgGreenBright("Расширение файла: ", path.extname(__filename)));
console.log('Parse: ', path.parse(__filename));

/* создание папки(только уникальные названия, если повторяется, то выдает ошибку) */

fs.mkdir(path.join(__dirname, 'jsFiles'),(err) => {
    if (err) {
        throw err;
    }
    console.log('Папка создана');
})


const filePath = path.join(__dirname, 'jsFiles', 'checker.js');
const data = `let str = "some Data"`;
// const filePath = path.join(__dirname, 'files', 'text2.txt');
write(filePath, data);
print('./files/text.txt');


compareFileSizes(__filename, './files/text.txt', (_err, result) => console.log(result))

const firstPath = path.join(__dirname, 'files', 'text2.txt');
const secondPath = path.join(__dirname, 'files','text.txt');

move(firstPath, secondPath, (error) => {
    if (error) {
        console.log('oops');
        return;
    }
    console.log(chalk.bgBlue('yes!'));
});

getDirectorySize(__dirname, (err, size) => {
    console.log(size);
})

const id = watch('./files/text.txt', 500, (err) => {
    if(err) throw err;
    console.log(chalk.green('Wow!'));
});

setTimeout(() => fs.appendFileSync('./files/text.txt', '\n ehu'), 700);
setTimeout(() => clearInterval(id), 5000);

unionFiles('./files/text.txt', './files/text2.txt', './files/newText.txt', (err)=>{
    if(err) throw err;
})

reverse('./files/newText.txt');

touch('./files/text.txt');


const filePaths = ['./files', './files/tex.txt', './files/newText.txt'];
getTypes(filePaths);

getDirSize(__dirname);

wait(2500).then(() => console.log('time is over!'))

exchange('./files/text.txt','./files/text2.txt');

const url = 'http://almaz.com';
const links = getBadLinks(url)
    .then(links => console.log(links))


