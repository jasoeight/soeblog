import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messagesDeDe from './messages.de_DE';
import messagesEnUs from './messages.en_US';

Vue.use(VueI18n);

const i18n = new VueI18n({
    messages: {
        'de_DE': messagesDeDe,
        'en_US': messagesEnUs
    },
    locale: 'en_US',
    fallbackLang: 'en_US'
});

const i18nMixin = {
    computed: {
        language() {
            return this.$store.getters['user/language'];
        }
    },
    watch: {
        language(language, oldLanguage) {
            if (language !== oldLanguage) {
                this.$i18n.locale = language;
            }
        }
    },
    created() {
        this.$i18n.locale = this.language;
    }
};

export default i18n;
export {
    i18n,
    i18nMixin
};
