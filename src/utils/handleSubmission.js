import getOdesliLinks from "./odesli-getLinks";

function video({ youtubeUrl }) {
    return getOdesliLinks(youtubeUrl)
        .then(({ entityUniqueId, entitiesByUniqueId }) => {
            const { title, artistName, id } = entitiesByUniqueId[entityUniqueId];
            return {
                title,
                description: artistName,
                videoUrl: `https://www.youtube.com/embed/${id}`,
            };
        });
}

function audio({ audioUrl }) {
    return getOdesliLinks(audioUrl)
        .then(({ entityUniqueId, entitiesByUniqueId }) => {
            const { title, artistName, id } = entitiesByUniqueId[entityUniqueId];
            return {
                title,
                description: artistName,
                audioUrl: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&color=%23b55e33&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
            };
        });
}

function rec({ spotifyUrl, infoUrl }) {
    return getOdesliLinks(spotifyUrl)
        .then(({ entityUniqueId, entitiesByUniqueId, linksByPlatform }) => {
            const { title, artistName, thumbnailUrl } = entitiesByUniqueId[entityUniqueId];
            const { amazonStore, itunes } = linksByPlatform;
            return {
                cdUrl: amazonStore.url,
                groupName: artistName,
                imageUrl: thumbnailUrl,
                itunesUrl: itunes.url,
                spotifyUrl: spotifyUrl,
                title,
                infoUrl
            };
        });
}

export { video, audio, rec };