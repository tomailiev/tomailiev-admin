import { db } from './firebase-config';

function getContent(type) {
    return db.collection(type)
        .get()
        .then(querySnapshot => {
            const docs = [];
            querySnapshot.forEach(x => {
                docs.push(x.data());
            });
            return docs;
        })
}

export default getContent;