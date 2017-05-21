<template>
    <layout>
        <div v-if="!init" class="layout-padding">
            <q-progress style="height: 45px" class="indeterminate stripe"></q-progress>
        </div>
        <div v-else-if="notFound" class="layout-padding">
            <div  class="card bg-negative text-white">
                <div class="card-content">
                    {{ $t('item_not_found') }}
                </div>
            </div>
        </div>
        <template v-else>
            <q-parallax :src="journey.image" :height="450">
                <spinner slot="loading" :size="60"></spinner>
                <h1>{{ journey.title }}</h1>
            </q-parallax>
            <p class="layout-padding small-content" v-html="journey.getDescription()"></p>
            <div v-if="locations.length > 0" class="bg-grey-1">
                <div class="layout-padding small-content">
                    <h3>{{ $t('route') }}</h3>
                    <div v-if="journey.hasLocations()" class="timeline">
                        <template v-for="location in locations">
                            <location :location="location"></location>
                        </template>
                    </div>
                </div>
            </div>
        </template>
        <other-journeys></other-journeys>
    </layout>
</template>

<script>
    import Layout from './Layout.vue';
    import Location from './journey/Location.vue';
    import OtherJourneys from './journey/OtherJourneys.vue';
    import * as Database from 'src/database';

    export default {
        name: 'frontend-journey',
        components: {
            Layout,
            Location,
            OtherJourneys
        },
        data() {
            return {
                init: false,
                notFound: false,
                locations: []
            };
        },
        methods: {
            async preparePage() {
                this.init = false;
                const db = await Database.get();
                this.journey = await db.journey.findById(this.$route.params.journey);
                if (this.journey !== null) {
                    this.prepareLocations();
                } else {
                    this.notFound = true;
                }
                this.init = true;
            },
            async prepareLocations() {
                let locations = await this.journey.locations_;
                this.locations = locations.filter(location => {
                    return location.published === true;
                });
            }
        },
        watch: {
            '$route': 'preparePage'
        },
        mounted() {
            this.preparePage();
        }
    };
</script>
