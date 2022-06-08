import fs from 'fs';

/* следит за внесением изменений в файл после запуска функции до прерывания таймера */
export const watch = (path, period, cb) => {
    let now = Date.now();
    const timerId = setInterval(() => {
        fs.stat(path, (stErr, stats) => {
            if (stErr) {
                clearInterval(timerId);
                cb(stErr);
            }
            let lastChangeTime = Math.floor(stats.mtimeMs);
            if (lastChangeTime < now) {
                cb(null);
            }
        })
    }, period);
    return timerId;
}