import { db, Timestamp } from './firebase-config';

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

function uploadData(type, item) {
    const upload = type === 'events'
        ? { ...item, dateTime: Timestamp.fromDate(item.dateTime) }
        : item

    db.collection(type)
        .add(upload)
        .then(console.log)
        .catch(console.error());
}

export { getContent, uploadData };