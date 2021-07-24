const odesliUri = 'https://api.song.link/v1-alpha.1/links?userCountry=US&url='

function getOdesliLinks(url) {
    return fetch(`${odesliUri}${encodeURIComponent(url)}`)
        .then(x => x.json())
}

export default getOdesliLinks;