import Vue from 'vue';
import Firebase from 'firebase';
import VueFire from 'vuefire';

Vue.use(VueFire);

const firebaseApp = Firebase.initializeApp({
    apiKey: 'AIzaSyDGoc8qmt2RE1fkhRK2ocGKoXxjtvXv6KQ',
    authDomain: 'soeblog-9a991.firebaseapp.com',
    databaseURL: 'https://soeblog-9a991.firebaseio.com',
    projectId: 'soeblog-9a991',
    storageBucket: 'soeblog-9a991.appspot.com',
    messagingSenderId: '1044531389999'
});

const db = firebaseApp.database();

export default {
    methods: {
        '$db'() {
            return db;
        },
        '$firebaseApp'() {
            return firebaseApp;
        }
    }
};
