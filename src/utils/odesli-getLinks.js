function getOdesliLinks(url) {
    return fetch(`https://us-central1-toma-iliev.cloudfunctions.net/api/getOdesliLinks/${encodeURIComponent(url)}`)
        .then(x => {
            console.log(x);
            return x.json();
        })
        .catch(e => {
            console.log(e.code);
        });
}

export default getOdesliLinks;