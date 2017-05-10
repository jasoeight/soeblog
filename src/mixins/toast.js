import { Toast } from 'quasar';

export default {
    methods: {
        '$toastError'(message) {
            Toast.create.negative({
                html: message,
                timeout: 90000
            });
        },
        '$toastNegative'(message) {
            Toast.create.negative({
                html: message
            });
        },
        '$toastSuccess'(message) {
            Toast.create.positive({
                html: message
            });
        }
    }
};
