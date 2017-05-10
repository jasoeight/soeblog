<template>
    <q-layout>
        <div slot="header" class="toolbar toolbar__header">
            <q-toolbar-title :padding="0">{{ $t('page_title') }}</q-toolbar-title>
            <navigation></navigation>
            <language></language>
        </div>
        <div class="layout-view">
            <!--<journeys></journeys>-->
        </div>
    </q-layout>
</template>

<script>
    import Navigation from './Navigation.vue';
    import Journeys from './home/Journeys.vue';
    import Language from 'src/components/admin/user/Language.vue';

    export default {
        name: 'frontend-index',
        components: {
            Navigation,
            Journeys,
            Language
        }
    };
</script>
