<template>
    <div class="card-title bg-primary text-white">
        <div class="row">
            <div class="auto">{{ title }}<br><small>{{ description }}</small></div>
            <button class="primary small" v-if="showLocations">
                <i>location_on</i> {{ $t('location_switch') }}
                <q-popover ref="locationSelection">
                    <div class="list item-delimiter highlight">
                        <div
                            v-for="location in locations"
                            :key="location._id"
                            class="item item-link"
                            @click="linkToLocation(location), $refs.locationSelection.close()"
                        >
                            <i class="item-primary">{{ locationRxdb._id === location._id ? 'check_circle' : '' }}</i>
                            <div class="item-content">{{ location.name }}</div>
                        </div>
                        <router-link
                            tag="div"
                            class="item item-link"
                            active-class=""
                            :to="{name: 'admin_journeys_location', params: {journey: $route.params.journey}}"
                            @click="$refs.locationSelection.close()"
                        >
                            <i class="item-primary">add</i>
                            <div class="item-content">{{ $t('location_add') }}</div>
                        </router-link>
                    </div>
                </q-popover>
            </button>
            <button
                v-if="$route.params.location && journey.hasLocation($route.params.location)"
                class="negative"
                @click.prevent="confirmDeleteLocation(locationRxdb)"
            >
                <i>delete</i> {{ $t('location_delete') }}
            </button>
        </div>
    </div>
</template>

<script>
    import LocationMixin from 'src/mixins/location';
    export default {
        name: 'admin-journeys-locations-detail-title',
        mixins: [ LocationMixin ],
        props: {
            journey: {
                type: Object,
                required: true
            },
            locationRxdb: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                locations: []
            };
        },
        computed: {
            title() {
                return this.$route.params.location ? this.$t('location_edit') : this.$t('location_add');
            },
            description() {
                return `${this.journey.title} (${this.journey.lang})`;
            },
            showLocations() {
                return this.journey.hasLocations();
            }
        },
        methods: {
            linkToLocation(location) {
                this.$router.push({
                    name: 'admin_journeys_location',
                    params: {
                        journey: this.$route.params.journey,
                        location: location._id
                    }
                });
            },
            deleteItemLocationSuccess() {
                this.$router.push({
                    name: 'admin_journeys_location',
                    params: {
                        journey: this.$route.params.journey
                    }
                });
            },
            async loadLocations() {
                this.locations = await this.journey.locations_;
            }
        },
        mounted() {
            this.loadLocations();
        }
    };
</script>

