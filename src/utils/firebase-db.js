import { db } from './firebase-config';

function getContent(type) {
    return db.collection(type)
        .get()
        .then(querySnapshot => {
            const docs = [];
            querySnapshot.forEach(x => {
                docs.push(Object.assign({ id: x.id }, x.data()));
            });
            return docs;
        })
}

export default getContent;