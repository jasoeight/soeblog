import * as RxDB from 'rxdb';
import 'babel-polyfill';
import collections from './collections';

RxDB.plugin(require('pouchdb-adapter-idb'));
RxDB.plugin(require('pouchdb-adapter-http')); // enable syncing over http
RxDB.plugin(require('pouchdb-replication')); // enable syncing

const syncURL = 'http://localhost:5984/blog-';

const _create = async function() {
    const db = await RxDB.create({
        name: 'soeblog',           // <- name
        adapter: 'idb',          // <- storage-adapter
        password: 'password',     // <- password (optional)
        multiInstance: true         // <- multiInstance (default: true)
    });

    // create collections
    await Promise.all(
        collections.map(colData => db.collection(colData))
    );

    // sync
    collections
        .filter(col => col.sync)
        .map(col => col.name)
        .map(colName => db[colName].sync(syncURL + colName + '/'));

    return db;
};

let dbPromise = null;

export function get() {
    if (!dbPromise) {
        dbPromise = _create();
    }

    return dbPromise;
};
