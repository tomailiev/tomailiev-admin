import { api } from "../config";

function fetchEvents(code) {
    return fetch(`${api}/events?group=${code}`)
        .then(res => res.json())
        .catch(console.error);
}

export default fetchEvents;