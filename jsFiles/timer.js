import { promises as fsp } from 'fs'

/* создает таймер с переданными миллисекундами =)))*/
export function wait(ms) {
    const p = new Promise(resolve => setTimeout(()=>resolve(),ms));
    return p;
}
