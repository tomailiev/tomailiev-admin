import { api } from '../config';

function getOdesliLinks(url) {
    const encoded = encodeURIComponent(url);
    return fetch(`${api}/odesli?uri=${encoded}`)
        .then(x => {
            console.log(x);
            return x.json();
        })
        .catch(e => {
            console.log(e.code);
        });
}

export default getOdesliLinks;