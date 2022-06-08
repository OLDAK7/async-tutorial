/* запись в файл(повторная запись перетирает предыдущую, для продолжения использовать appendFile) */

import fs from 'fs';
import chalk from 'chalk';
// const filePath = path.join(__dirname, 'files', 'text.txt');
const callback = (err) => {
    if (err) throw err;
    console.log(chalk.bgGreen('Success'));
}
// console.log(chalk.red("before write"));
export const write = (path,data) => {
    fs.writeFile(path, data, callback)
}
// console.log(chalk.bgBlue("after write"));