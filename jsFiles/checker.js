import axios from "axios";
import { parse } from "node-html-parser";
/* загружает содержимое переданной страницы, извлекает из него ссылки и проверяет их доступность.*/
export async function getBadLinks(url) {
    try {
        const response = await axios.get(url);
        const allLinks = await extractLinks(response);
        const badLinks = [];
        const promises = allLinks.map(link => new Promise((resolve,reject)=> {
            axios.get(link)
                .then((response) => {
                    if (!response || response.status !== 200) {
                        badLinks.push(link);
                        console.log('запушено через успех');
                    };
                    resolve(console.log('не запушено'));
                })
                .catch((e) => {
                    badLinks.push(link);
                    resolve(console.log('запушено через ошибку'));
                });
        }))
        await Promise.all(promises);
        return badLinks;
    } catch (error) {
        console.log(typeof error);
        throw "Ошибка!", error;
    }
    
}

const extractLinks = async (resp) => {
    let content = parse(`${resp.data}`);
    let links = content.querySelectorAll('a').map(item=> item.rawAttrs.slice(6,-17));
    return links;
}