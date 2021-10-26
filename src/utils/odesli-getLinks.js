function getOdesliLinks(url) {
    const encoded = encodeURIComponent(url);
    return fetch(`https://us-central1-toma-iliev.cloudfunctions.net/api/odesli?uri=${encoded}`)
        .then(x => {
            console.log(x);
            return x.json();
        })
        .catch(e => {
            console.log(e.code);
        });
}

export default getOdesliLinks;