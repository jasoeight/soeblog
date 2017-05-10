<template>
    <q-layout>
        <div class="layout-view">
            <div class="layout-padding">
                <div class="card bg-primary text-white">
                    <div class="card-title">Login and SignUp using firebase + Vue</div>
                    <div class="card-content">
                        <div class="floating-label">
                            <input v-model="email" type="email" placeholder="" required class="full-width">
                            <label>{{ $t('email') }}</label>
                        </div>
                        <div class="floating-label">
                            <input v-model="password" type="password" autocomplete="off" placeholder="" required class="full-width">
                            <label>{{ $t('password') }}</label>
                        </div>
                    </div>
                    <div class="card-actions">
                        <div class="auto"></div>
                        <div>
                            <button class="primary" @click.prevent="login">
                                <i class="on-left">done</i> {{ $t('login') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </q-layout>
</template>

<script>
    export default {
        name: 'authentication-login',
        data() {
            return {
                email: '',
                password: ''
            };
        },
        methods: {
            /**
             * Authenticate the user
             *
             * @param object event
             */
            login(event) {
                if (this.email === '' || this.password === '') {
                    this.$root.$toastError(this.$t('login_provide_email_and_password'));
                    return;
                }
                // Sign-in the user with the email and password
                this.$root.$firebaseApp().auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(data => {
                        const user = this.$root.$firebaseApp().auth().currentUser;
                        if (user != null) {
                            this.$store.dispatch('user/set', {
                                id: user.uid,
                                displayName: user.displayName,
                                email: user.email,
                                photoURL: user.photoURL,
                                emailVerified: user.emailVerified
                            });
                        }

                        this.$router.push({ name: 'admin' });
                    })
                    .catch(error => {
                        this.$root.$toastError(error.message);
                    });
            }
        }
    };
</script>
