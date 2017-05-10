<template>
    <detail-form
        icon="star"
        :title="$t('activities')"
        :items="location.activities"
        :titleNew="$t('activity_new')"
    ></detail-form>
</template>

<script>
    import DetailForm from './Form.vue';

    export default {
        name: 'admin-journeys-locations-detail-activities',
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
