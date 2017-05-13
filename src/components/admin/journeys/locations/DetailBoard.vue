<template>
    <detail-form
        icon="restaurant"
        :title="$t('board')"
        :items="location.boards"
        :titleNew="$t('board_new')"
    ></detail-form>
</template>

<script>
    import DetailForm from './Form.vue';

    export default {
        name: 'admin-journeys-locations-detail-board',
        components: {
            DetailForm
        },
        props: {
            location: {
                type: Object,
                required: true
            }
        }
    };
</script>
