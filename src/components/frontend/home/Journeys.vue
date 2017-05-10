<template>
    <div class="layout-padding">
        <h2 class="text-primary">{{ $t('journeys') }}</h2>
        <div>
            <div class="row medium-gutter">
                <journey v-for="journey in journeys" :key="journey.__key" :journey="journey"></journey>
            </div>
        </div>
    </div>
</template>

<script>
    import Journey from './Journey.vue';
    export default {
        name: 'frontend-home-journeys',
        components: {
            Journey
        },
        firebase() {
            return {
                journeys: {
                    source: this.$root.$db().ref('journeys'),
                    readyCallback: this.load
                }
            };
        },
        methods: {
            load() {
                this.$firebaseRefs.journeys.orderByChild('language').equalTo(this.$store.getters['user/language']);
                this.$bindAsArray('journeys', this.$firebaseRefs.journeys.limitToLast(6));
            }
        }
    };
</script>
