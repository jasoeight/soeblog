<template>
    <div class="card-content">
        <div class="list">
            <div class="item item-delimiter" v-for="(location, index) in locations">
                <div class="toolbar inverted text-primary">
                    <i class="item-primary">location_city</i>
                    <q-toolbar-title :padding="1">{{ location.name }}</q-toolbar-title>
                    <router-link
                        :to="{ name: 'admin_journeys_location', params: { journey: journey._id, location: index } }"
                        tag="button"
                        class="primary text-white small"
                    >
                        <i>edit</i>
                        <q-tooltip>{{ $t('detail_view') }}</q-tooltip>
                    </router-link>
                    <button class="negative text-white small" @click.prevent="confirmDeleteLocation(index)">
                        <i>delete</i>
                        <q-tooltip>{{ $t('delete_item') }}</q-tooltip>
                    </button>
                </div>
            </div>
            <router-link
                :to="{name: 'admin_journeys_location', params: { journey: journey._id }}"
                tag="button"
                class="primary block bg-blue-6 full-width text-center text-white no-padding"
            ><i>add</i> {{ $t('location_add') }}</router-link>
        </div>
    </div>
</template>

<script>
    import LocationMixin from '../mixins/Location';
    export default {
        name: 'admin-journeys-locations-list',
        mixins: [ LocationMixin ],
        props: {
            journey: {
                type: Object,
                required: true
            }
        },
        computed: {
            locations() {
                return this.journey.getLocations();
            }
        }
    };
</script>
