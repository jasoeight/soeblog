<template>
    <div class="card-title bg-primary text-white">
        <div class="row">
            <div class="auto">{{ title }}<br><small>{{ description }}</small></div>
            <button class="primary small" v-if="showLocations">
                <i>location_on</i> {{ $t('location_switch') }}
                <q-popover ref="locationSelection">
                    <div class="list item-delimiter highlight">
                        <div
                            v-for="(location, index) in journey.getLocations()"
                            v-if="index !== '.key'"
                            :key="location['.key']"
                            class="item item-link"
                            @click="linkToLocation(index), $refs.locationSelection.close()"
                        >
                            <i class="item-primary"></i>
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
            <button v-if="journey.hasLocation($route.params.location)" class="negative" @click.prevent="confirmDeleteLocation($route.params.location)">
                <i>delete</i> {{ $t('location_delete') }}
            </button>
        </div>
    </div>
</template>

<script>
    import LocationMixin from '../mixins/Location';
    export default {
        name: 'admin-journeys-locations-detail-title',
        mixins: [ LocationMixin ],
        props: {
            journey: {
                type: Object,
                required: true
            }
        },
        computed: {
            title() {
                return this.$route.params.location ? this.$t('location_edit') : this.$t('location_add');
            },
            description() {
                return `${this.journey.title} (${this.journey.lang})`;
            },
            showLocations() {
                return this.journey.getLocations().length > 0;
            }
        },
        methods: {
            linkToLocation(index) {
                this.$router.push({
                    name: 'admin_journeys_location',
                    params: {
                        journey: this.$route.params.journey,
                        location: index
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
            }
        }
    };
</script>

