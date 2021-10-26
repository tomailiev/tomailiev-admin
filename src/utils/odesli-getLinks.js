function getOdesliLinks(url) {
    return fetch(`http://localhost:5001/toma-iliev/us-central1/api/getOdesliLinks/${encodeURIComponent(url)}`)
        .then(x => {
            console.log(x);
            return x.json();
        })
        .catch(e => {
            console.log(e.code);
        });
}

export default getOdesliLinks;