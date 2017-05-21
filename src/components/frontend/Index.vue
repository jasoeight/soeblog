<template>
    <layout>
        <journeys></journeys>
    </layout>
</template>

<script>
    import Layout from './Layout.vue';
    import Journeys from './home/Journeys.vue';

    export default {
        name: 'frontend-index',
        components: {
            Layout,
            Journeys
        }
    };
</script>
