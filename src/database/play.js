import PouchDB from 'pouchdb';

const dbName = 'soeblog';
const localDB = new PouchDB('soeblog');
const remoteDB = new PouchDB(`http://localhost:5984/${dbName}`);

localDB.sync(remoteDB, {
    live: true,
    retry: true
}).on('change', change => {
    console.log('Sync - Changed', change);
}).on('paused', info => {
    console.log('Sync - Info', info);
}).on('active', info => {
    console.log('Sync - Active', info);
}).on('error', error => {
    console.log('Sync - Error', error);
});

localDB.changes({
    since: 0,
    include_docs: true,
    live: true
}).then(changes => {
    console.log('Local Changes', changes);
}).catch(error => {
    console.log('Local Changes - Error', error);
});

console.log('Local DB', localDB);
console.log('Remote DB', remoteDB);

localDB.info().then(info => {
    console.log('Local', info);
});

remoteDB.info().then(info => {
    console.log('Remote', info);
});

localDB.put({
    '_id': 'mittens',
    'name': 'Mittens',
    'occupation': 'kitten',
    'age': 3,
    'hobbies': [
        'playing with balls of yarn',
        'chasing laser pointers',
        'lookin hella cute'
    ]
});

localDB.get('mittens')
    .then(doc => {
        console.log('Mittens', doc);
        localDB.remove(doc);
    })
    .then(doc => {
        console.log('Removed');
    })
    .catch(error => {
        console.log('Error', error);
    });
