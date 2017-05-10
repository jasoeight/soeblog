<template>
    <q-layout v-if="$store.getters['user/isAuthenticated']">
        <div slot="header" class="toolbar">
            <button class="hide-on-drawer-visible" @click="$refs.navigation.$refs.drawer.open()">
                <i>menu</i>
            </button>
            <q-toolbar-title :padding="0">{{ $t('admin_panel') }}</q-toolbar-title>
            <language></language>
        </div>
        <left-drawer ref="navigation"></left-drawer>
        <q-transition name="slide">
            <router-view class="layout-view"></router-view>
        </q-transition>
    </q-layout>
</template>

<script>
    import LeftDrawer from './drawer/LeftDrawer.vue';
    import Language from './user/Language.vue';

    export default {
        name: 'admin-index',
        components: {
            LeftDrawer,
            Language
        },
        created() {
            if (!this.$store.getters['user/isAuthenticated']) {
                this.$router.push({ name: 'login' });
            }
        }
    };
</script>
