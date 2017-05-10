<template>
    <div class="card-content">
        <div class="list">
            <div class="item item-delimiter" v-for="location in locations">
                <div class="toolbar inverted text-primary">
                    <i class="item-primary">location_city</i>
                    <q-toolbar-title :padding="1">{{ location.name }}</q-toolbar-title>
                    <router-link
                        :to="{ name: 'admin_journeys_location', params: { journey: journey['.key'], location: location['.key']} }"
                        tag="button"
                        class="primary text-white small"
                    >
                        <i>edit</i>
                        <q-tooltip>{{ $t('detail_view') }}</q-tooltip>
                    </router-link>
                    <button class="negative text-white small" @click.prevent="confirmDelete(location)">
                        <i>delete</i>
                        <q-tooltip>{{ $t('delete_item') }}</q-tooltip>
                    </button>
                </div>
            </div>
            <router-link
                :to="{name: 'admin_journeys_location', params: { journey: journey['.key'] }}"
                tag="button"
                class="primary block bg-blue-6 full-width text-center text-white no-padding"
            ><i>add</i> {{ $t('location_add') }}</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'admin-journeys-locations-list',
        props: {
            journey: {
                type: Object,
                required: true
            }
        },
        firebase() {
            return {
                locations: this.$root.$db().ref(`journeys/${this.journey['.key']}/locations`)
            };
        },
        methods: {
            confirmDelete(item) {
                this.$root.$deleteDialog(item.name, item, this.deleteItem);
            },
            deleteItem(item) {
                this.$firebaseRefs.locations.child(item['.key']).remove()
                    .then(() => {
                        this.$root.$toastSuccess(this.$t('delete_item_successfully'));
                    })
                    .catch(error => {
                        this.$root.$toastError(error.message);
                    });
            }
        }
    };
</script>
