import fs from 'fs';

/* сравнение размеров файлов */

export const compareFileSizes = (path1, path2, callback) =>{
    fs.stat(path1, (_errPath1, stats1) => {
        if (_errPath1) throw _errPath1
        fs.stat(path2, (_errPath2, stats2) => {
            if (_errPath2) throw _errPath2
            callback(null, Math.sign(stats1.size - stats2.size));
        });
    });
};

