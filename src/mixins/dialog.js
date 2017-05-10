import { Dialog } from 'quasar';

export default {
    methods: {
        '$deleteDialog'(title, item, deleteCallback) {
            Dialog.create({
                title: this.$t('delete_item'),
                message: this.$t('delete_item_question', { title }),
                buttons: [
                    {
                        label: this.$t('disagree'),
                        classes: 'negative clear',
                        style: 'text-decoration: underline'
                    },
                    {
                        label: this.$t('agree'),
                        classes: 'positive',
                        handler() {
                            deleteCallback(item);
                        }
                    }
                ]
            });
        },
        '$publishDialog'(title, item, value, callback) {
            Dialog.create({
                title: this.$t(value ? 'publish' : 'unpublish'),
                message: this.$t(value ? 'publish_question' : 'unpublish_question', { title }),
                buttons: [
                    {
                        label: this.$t('disagree'),
                        classes: 'negative clear',
                        style: 'text-decoration: underline'
                    },
                    {
                        label: this.$t('agree'),
                        classes: 'positive',
                        handler() {
                            callback(item, value);
                        }
                    }
                ]
            });
        }
    }
};
