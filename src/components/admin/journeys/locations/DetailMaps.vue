<template>
    <div>
        <div class="toolbar">
            <i>location_on</i>
            <q-toolbar-title :padding="1">{{ $t('maps') }}</q-toolbar-title>
        </div>
        <map-search
            :label="$t('location_search_string')"
            v-model="location.maps"
            :searchString.sync="location.mapsSearchString"
        ></map-search>
        <div class="card-media">
            <map-card :longitude="longitude" :latitude="latitude" :zoom="zoom" size="big"></map-card>
        </div>
    </div>
</template>

<script>
    import MapSearch from 'src/components/maps/Search.vue';
    import MapCard from 'src/components/maps/Card.vue';

    export default {
        name: 'admin-journeys-locations-detail-maps',
        components: {
            MapSearch,
            MapCard
        },
        props: {
            location: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                zoom: 8,
                longitude: 6.7185413,
                latitude: 51.2281
            };
        },
        watch: {
            'location.maps'() {
                if (this.location.maps && Object.keys(this.location.maps).length > 0) {
                    this.longitude = this.location.maps.lon;
                    this.latitude = this.location.maps.lat;
                }
            }
        }
    };
</script>
