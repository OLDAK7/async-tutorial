import fs from 'fs';
import chalk from 'chalk';

/* читает файл, создает новый файл с данными первого и удаляет его после создания нового */

export const move = (startPath, copyPath, cb) =>  {
    fs.readFile(startPath,'utf-8', (_readErr,data)=>{
        if (_readErr) throw _readErr;
        console.log(chalk.green(data));
        const content = data;
        fs.writeFile(copyPath, content, (_writeErr)=>{
            if(_writeErr) throw _writeErr;
            console.log(chalk.bgGreen('Успешно создано!'));
            fs.unlink(startPath,(_unlinkErr)=>{
                if(_unlinkErr) throw _unlinkErr;
                console.log(chalk.bgRed('Исходный файл удалён'));
                cb(null);
            })
        })
    })
}

// Реализуйте и экспортируйте функцию move, 
// которая асинхронно перемещает файл из одного места в другое.Ее параметры:

// Путь до файла исходника
// Путь по которому нужно копировать файл
// Колбек, у которого единственный аргумент — ошибка.
// Алгоритм работы функции следующий:

// Читаем исходный файл
// Создаём новый файл и записываем туда данные 
// исходного файла(это важно сделать до попытки удаления исходного файла!)
// Удаляем исходный файл