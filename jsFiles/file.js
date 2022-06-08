import fs from 'fs';
import { waterfall } from 'async';
import { map } from 'async';
import chalk from 'chalk';
import _ from 'lodash';
import path from 'path';

const { promises: fsp} = fs;

/* читает файлы и создает новый  файл с общим содержимым прочитанных */
export const unionFiles = (inputPath1, inputPath2, outputPath, cb) => {
    waterfall([
        function readFirstFile(readFirstFileCallback) {
            fs.readFile(inputPath1, 'utf-8', (readFirstErr, data1) => {
                if (readFirstErr) throw readFirstErr;
                console.log(data1);
                readFirstFileCallback(null, data1);
            });
        },
        function readSecondFile(data1, readSecondFileCallback) {
            fs.readFile(inputPath2, 'utf-8', (readSecondErr, data2) => {
                if (readSecondErr) throw readSecondErr;
                console.log(data2);
                readSecondFileCallback(null, data1, data2);
            });
        },
        function writeFiles(data1, data2, processFileCallback) {
            fs.writeFile(outputPath, `${data1}\n${data2}`, (writeErr) => {
                if (writeErr) throw writeErr;
                console.log(chalk.green("Files successfully written"));
                processFileCallback(null)
            })
        }
    ], cb(null))
}

/* читает файл и меняет местами все строки*/
export function reverse(file) {
    fsp.readFile(file, 'utf-8')
        .then(data => getString(data, '\n'))
        .then(revStr => fsp.writeFile(file, revStr))
        .then(console.log('file is reversed'))
}

function getString(strData, symbol) {
    let revStr = strData.split(symbol).reverse().join(symbol);
    return revStr;
}

/* проверяет доступность файла по переданному пути, если не находит, создает его с переданной строкой */
export function touch(file) {
    fsp.access(file)
        .then(() => console.log(chalk.bgGreen('can access')))
        .catch((err) => {
            console.error(chalk.bgRed('access canceled'),err)
            fsp.writeFile(file, 'any data')
                .then(() => console.log(chalk.bgGreen('File added in this path with string "any data"')))
                .catch((writeErr) => {
                    console.error(writeErr);
                })
        })
}

/* проверяет на принадлежность к файлам или директории(если ошибка пушит null)*/
export function getTypes(filePaths) {
    const initPromise = Promise.resolve([]);
    // В then отдается функция, а не ее вызов!
    const promise = filePaths.reduce((acc, path) => {
        // Аккумулятор – всегда промис, внутри которого массив с содержимым файлов
        const newAcc = acc.then((contents) => 
            fsp.stat(path).then(function(stats) {
                if (stats.isDirectory()) return contents.concat('directory')
                return contents.concat('file')
            })  
            .catch(() => contents.concat(null))
            )
        return newAcc;
    }, initPromise);
    promise.then(data => console.log(data))  
}

/* вычисление общего размера файлов */
export function getDirSize(directoryes) {
    /* 1 */
    // const promises = fsp.readdir(directoryes)
    //     .then((dir) => map(dir, fsp.stat)
    //     .then(stat => stat.map(item => item.size))
    //     .then(sizes => _.sumBy(sizes)));
    // return promises.then(data=>console.log(data))
    /* 2 */
    // fsp.readdir(directoryes).then(async filenames => {
    //     const promises = filenames.map(file => fsp.stat(file))
    //     const promise = Promise.all(promises)
    //         .then(data => data.map(item => item.size))
    //         .then(sizes => _.sumBy(sizes))
    //     const result = await promise;
    //     return console.log(result);
    // }
    /* 3 */
    fsp.readdir(directoryes).then(filenames => {
        const promises = filenames.map(file => fsp.stat(file))
        const promise = Promise.all(promises)
            .then(data => data.map(item => item.size))
            .then(sizes => _.sumBy(sizes))
        return promise.then(result => console.log(result))
    })
}

/* читает файлы и меняет их содержимое местами */ 
export async function exchange(path1, path2) {
    const prom1 = fsp.readFile(path1, 'utf-8');
    const prom2 = fsp.readFile(path2, 'utf-8');
    const [data1, data2] = await Promise.all([prom1,prom2]);
    await Promise.all([fsp.writeFile(path1,data2), fsp.writeFile(path2,data1)])
}

