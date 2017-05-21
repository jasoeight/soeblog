<template>
    <div class="layout-padding small-content">
        <h2 class="text-primary">{{ $t('journeys') }}</h2>
        <div>
            <div class="row medium-gutter items-stretch wrap">
                <journey v-for="journey in journeys" :key="journey._id" :journey="journey"></journey>
            </div>
        </div>
    </div>
</template>

<script>
    import Journey from './Journey.vue';
    import * as Database from 'src/database';

    export default {
        name: 'frontend-home-journeys',
        components: {
            Journey
        },
        data() {
            return {
                journeys: []
            };
        },
        async mounted() {
            const db = await Database.get();
            db.journey
                .find({
                    lang: {$eq: this.$store.getters['user/language']},
                    published: true
                }).$
                .subscribe(documents => {
                    this.journeys = documents;
                });
        }
    };
</script>
