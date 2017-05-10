// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`);
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`);
// ==============================

import Vue from 'vue';
import Quasar from 'quasar';
import router from './router';
import store from './store';
import dbMixin from './firebase/setup';
import { i18n, i18nMixin } from './i18n';
import { dialogMixin, toastMixin } from './mixins';
import VueLayers from 'vuelayers';

Vue.use(Quasar); // Install Quasar Framework
Vue.use(VueLayers);

import './database';

Quasar.start(() => {
    /* eslint-disable no-new */
    new Vue({
        el: '#q-app',
        mixins: [
            dbMixin,
            dialogMixin,
            i18nMixin,
            toastMixin
        ],
        i18n,
        router,
        store,
        render: h => h(require('./App'))
    });
});
