<template>
    <q-layout>
        <div slot="header" class="toolbar toolbar__header">
            <q-toolbar-title :padding="0">{{ $t('page_title') }}</q-toolbar-title>
            <navigation></navigation>
            <language></language>
        </div>
        <div class="layout-view">
            <slot></slot>
        </div>
    </q-layout>
</template>

<script>
    import Navigation from './Navigation.vue';
    import Language from 'src/components/admin/user/Language.vue';

    export default {
        name: 'frontend-layout',
        components: {
            Navigation,
            Language
        }
    };
</script>
