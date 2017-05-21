<template>
    <q-drawer ref="drawer">
        <!--
        <div class="profile bg-primary">
            <span class="chip label">
                <img v-if="$store.getters['user/get'].photoURL" :src="$store.getters['user/get'].photoURL">
                <button class="primary circular small label__button" v-else>
                    <i>person</i>
                </button>
                <span class="text-white">{{ $store.getters['user/get'].displayName }}</span>
            </span>
            <hr>
            <div class="text-center">
                <router-link :to="{ name: 'admin_user_profile' }" tag="button" class="bordered blue small">
                    <i>person</i>
                    <q-tooltip>{{ $t('user_profile') }}</q-tooltip>
                </router-link>
                <button class="bordered blue small" @click="signOut">
                    <i>exit_to_app</i>
                    <q-tooltip>{{ $t('logout') }}</q-tooltip>
                </button>
            </div>
        </div>
        -->
        <navigation :links="links"></navigation>
    </q-drawer>
</template>

<script>
    import Navigation from './Navigation.vue';

    export default {
        name: 'admin-drawer-left-drawer',
        components: {
            Navigation
        },
        data() {
            return {
                links: [
                    {
                        label: 'journeys',
                        icon: 'terrain',
                        routes: [
                            { route: { name: 'admin_journeys' }, label: 'list' }
                        ],
                        show: false
                    }
                ]
            };
        },
        methods: {
            /**
             * Signout the currently logged-in user
             */
            signOut() {
                // Signout the user using firebase
                this.$root.$firebaseApp().auth().signOut()
                    .then(() => {
                        this.$store.dispatch('user/logout');
                        this.$router.push({ name: 'login' });
                    })
                    .catch(error => {
                        this.$root.$toastError(error.message);
                    });
            }
        }
    };
</script>

<style scoped lang="stylus">
.profile
    padding 20px 10px
.label__button
    margin-right 10px
    cursor default
</style>
