import fs from 'fs';
import { map } from 'async';
import _ from 'lodash';

/* вычисление размеров  файлов без промисов */
export const getDirectorySize = (dir,cb) => {
    fs.readdir(dir, (err, data) => {
        if (err) throw err
        console.log(_.isArray(data));
        map(data, fs.stat, (mapErr,results)=> {
            if(mapErr) throw mapErr;
            cb(null, _.sumBy(results, (o) => o.size))
        })   
    })
}
