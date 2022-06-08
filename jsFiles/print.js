/* чтение файла*/

import fs from 'fs';
import chalk from 'chalk';
const callback = (err, data) => {
    if (err) throw err;
    console.log(chalk.green(data));
}
// console.log(chalk.red("before read"));
export const print = (path) => {
    fs.readFile(path, 'utf-8', callback);
}
// console.log(chalk.bgBlue("after read"));
