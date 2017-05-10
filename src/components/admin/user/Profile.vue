<template>
    <div>
        <div class='layout-padding'>
            <div class="card">
                <div class="card-title bg-primary text-white">{{ $t('user_profile') }}</div>
                <div class="card-content">
                    <div class="stacked-label h-form-field-margin-bottom">
                        <input class="full-width" :value="$store.getters['user/get'].id" readonly>
                        <label>{{ $t('id') }}</label>
                    </div>
                    <div class="stacked-label h-form-field-margin-bottom">
                        <input class="full-width" :value="$store.getters['user/get'].email" readonly>
                        <label>{{ $t('email') }}</label>
                    </div>
                    <div class="floating-label h-form-field-margin-bottom">
                        <input required class="full-width" :value="$store.getters['user/get'].displayName" @input="user.displayName = $event.target.value">
                        <label>{{ $t('display_name') }}</label>
                    </div>
                    <div class="floating-label h-form-field-margin-bottom">
                        <input type="url" class="full-width" :value="$store.getters['user/get'].photoUrl" @input="user.photoUrl = $event.target.value">
                        <label>{{ $t('photo_url') }}</label>
                    </div>
                </div>
                <div class="card-actions">
                    <div class="auto"></div>
                    <div>
                        <button class="primary" @click.prevent="save">
                            <i class="on-left">save</i> {{ $t('save') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'admin-user-profile',
        data() {
            return {
                user: {
                    displayName: '',
                    photoURL: ''
                }
            };
        },
        methods: {
            save() {
                const user = this.$root.$firebaseApp().auth().currentUser;
                user.updateProfile(this.user)
                    .then(() => {
                        const user = this.$root.$firebaseApp().auth().currentUser;
                        if (user != null) {
                            this.$store.dispatch('user/set', {
                                id: user.uid,
                                displayName: user.displayName,
                                email: user.email,
                                photoURL: user.photoURL,
                                emailVerified: user.emailVerified
                            });
                            this.$root.$toastSuccess(this.$t('user_profile_save_success'));
                        }
                    })
                    .catch(error => {
                        this.$root.$toastError(error.message);
                    });
            }
        }
    };
</script>
