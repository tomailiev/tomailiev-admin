import { db, Timestamp } from './firebase-config';

function getContent(type) {
    return db.collection(type)
        .get()
        .then(querySnapshot => {
            const docs = [];
            querySnapshot.forEach(x => {
                const item = x.data();
                if (type === 'events') {
                    item.dateTime = item.dateTime.toDate().toString();
                }
                docs.push(Object.assign({ id: x.id }, item));
            });
            return docs;
        })
}

function uploadData(type, item) {
    const collection = type.endsWith('s') ? type : type + 's';
    const upload = collection === 'events'
        ? {
            ...item,
            dateTime: Timestamp.fromDate(new Date(item.dateTime)),
            date: new Date(item.dateTime).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            time: new Date(item.dateTime).toLocaleString('hr', { timeStyle: 'short' })
        }
        : item

    if (item.id) {
        return db.collection(collection)
            .doc(item.id)
            .set(upload)
            .then(console.log)
            .catch(console.error);
    }

    return db.collection(collection)
        .add(upload)
        .then(console.log)
        .catch(console.error);
}

export { getContent, uploadData };