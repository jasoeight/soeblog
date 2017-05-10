<template>
    <div class="card-title bg-primary text-white">
        <div class="row">
            <div class="auto">{{ title }}<br><small>{{ description }}</small></div>
            <button class="primary small" v-if="showLocations">
                <i>location_on</i> {{ $t('location_switch') }}
                <q-popover ref="locationSelection">
                    <div class="list item-delimiter highlight">
                        <div
                            v-for="(location, index) in locations"
                            v-if="index !== '.key'"
                            :key="location['.key']"
                            class="item item-link"
                            @click="linkToLocation(location), $refs.locationSelection.close()"
                        >
                            <i class="item-primary"></i>
                            <div class="item-content">{{ location.name }}</div>
                        </div>
                        <router-link
                            tag="div"
                            class="item item-link"
                            active-class=""
                            :to="{name: 'admin_journeys_location', params: {journey: $route.params.journey}}"
                            @click.native="$refs.locationSelection.close()"
                        >
                            <i class="item-primary">add</i>
                            <div class="item-content">{{ $t('location_add') }}</div>
                        </router-link>
                    </div>
                </q-popover>
            </button>
            <button v-if="$route.params.location" class="negative" @click.prevent="$emit('delete')">
                <i>delete</i> {{ $t('location_delete') }}
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'admin-journeys-locations-detail-title',
        props: {
            locations: {
                required: true
            },
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
                return `${this.journey.title} (${this.journey.language})`;
            },
            showLocations() {
                return this.locations['.value'] !== null;
            }
        },
        methods: {
            linkToLocation(location) {
                this.$router.push({
                    name: 'admin_journeys_location',
                    params: {
                        journey: this.$route.params.journey,
                        location: location['.key']
                    }
                });
            },
            deleteItem(item) {
                this.$emit('delete', item);
            }
        }
    };
</script>

