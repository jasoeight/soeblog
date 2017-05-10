import { LocalStorage, SessionStorage } from 'quasar';
const key = 'SOEBLOG';

const userKey = `${key}.user`;
const languageKey = `${key}.language`;

const state = {
    user: SessionStorage.get.item(userKey),
    language: LocalStorage.get.item(languageKey) || 'en_US',
};

const mutations = {
    'SET_USER' (state, user) {
        state.user = user;
        SessionStorage.set(userKey, state.user);
    },
    'SET_LANGUAGE' (state, language) {
        state.language = language;
        LocalStorage.set(languageKey, state.language);
    }
};

const actions = {
    set: ({ commit }, user) => {
        commit('SET_USER', user);
    },
    logout: ({ commit }) => {
        commit('SET_USER', null);
    },
    language: ({ commit }, language) => {
        commit('SET_LANGUAGE', language);
    }
};

const getters = {
    get: state => state.user || null,
    isAuthenticated: state => state.user !== null,
    language: state => state.language
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
