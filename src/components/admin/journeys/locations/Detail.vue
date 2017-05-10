<template>
    <div>
        <q-progress v-if="!init" style="height: 45px" class="indeterminate stripe"></q-progress>
        <div class="card" v-else>
            <q-fab class="fixed-top-right anker-navigation" classNames="primary" icon="view_list" direction="down">
                <q-small-fab class="white" @click.native="scrollTo('basic')" icon="assignment"></q-small-fab>
                <q-small-fab class="white" @click.native="scrollTo('map')" icon="place"></q-small-fab>
                <q-small-fab class="white" @click.native="scrollTo('accommodation')" icon="hotel"></q-small-fab>
                <q-small-fab class="white" @click.native="scrollTo('activities')" icon="stars"></q-small-fab>
                <q-small-fab class="white" @click.native="scrollTo('board')" icon="restaurant"></q-small-fab>
            </q-fab>
            <detail-title :locations="locations" :journey="journey" @delete="confirmDelete"></detail-title>
            <detail-basic ref="basic" :location="location"></detail-basic>
            <detail-maps ref="map" :location="location"></detail-maps>
            <detail-accommodations ref="accommodation" :location="location"></detail-accommodations>
            <detail-activities ref="activities" :location="location"></detail-activities>
            <detail-board ref="board" :location="location"></detail-board>
            <div class="card-actions">
                <div class="auto"></div>
                <div>
                    <button class="primary" @click.prevent="save">
                        <i class="on-left">save</i> {{ $t('save') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import DetailTitle from './DetailTitle.vue';
    import DetailBasic from './DetailBasic.vue';
    import DetailMaps from './DetailMaps.vue';
    import DetailAccommodations from './DetailAccommodations.vue';
    import DetailActivities from './DetailActivities.vue';
    import DetailBoard from './DetailBoard.vue';

    export default {
        name: 'admin-journeys-locations-detail',
        components: {
            DetailTitle,
            DetailBasic,
            DetailMaps,
            DetailAccommodations,
            DetailActivities,
            DetailBoard
        },
        firebase() {
            return {
                journey: {
                    source: this.$root.$db().ref(`journeys/${this.$route.params.journey}`),
                    asObject: true
                },
                locations: {
                    source: this.$root.$db().ref(`journeys/${this.$route.params.journey}/locations`),
                    readyCallback: function () {
                        this.loadLocation();
                    }
                }
            };
        },
        data() {
            return {
                location: {},
                init: false
            };
        },
        computed: {
            locationIndex() {
                return this.$route.params.location;
            }
        },
        methods: {
            scrollTo(name) {
                const container = this.$refs[name];
                if (container._isVue) {
                    container.$el.scrollIntoView();
                } else {
                    container.scrollIntoView();
                }
            },
            loadLocation() {
                this.location = {};
                if (this.locationIndex) {
                    this.$bindAsObject('location', this.$firebaseRefs.locations.child(this.locationIndex));
                }

                this.$set(this.location, 'createdDate', this.location.createdDate || moment().format());
                this.$set(this.location, 'name', this.location.name || '');
                this.$set(this.location, 'description', this.location.description || '');
                this.$set(this.location, 'startDate', this.location.startDate || '');
                this.$set(this.location, 'endDate', this.location.endDate || '');
                this.$set(this.location, 'mapsSearchString', this.location.mapsSearchString || '');
                this.$set(this.location, 'maps', this.location.maps || {});
                this.$set(this.location, 'accommodations', this.location.accommodations || []);
                this.$set(this.location, 'activities', this.location.activities || []);
                this.$set(this.location, 'board', this.location.board || []);
                this.$set(this.location, 'image', this.location.image || '');
                this.$set(this.location, 'published', this.location.published || false);
                this.init = true;
            },
            save() {
                let location = this.location;
                delete location['.key'];
                delete location['.value'];

                if (this.locationIndex) {
                    this.update(location);
                } else {
                    this.add(location);
                }
            },
            add(location) {
                this.$firebaseRefs.locations.push(location)
                    .then(data => {
                        this.$root.$toastSuccess(this.$t('item_saved_successfully'));
                        this.$router.push({
                            name: 'admin_journeys_location',
                            params: {
                                journey: this.$route.params.journey,
                                location: data.key
                            }
                        });
                    })
                    .catch(error => {
                        this.$root.$toastError(error.message);
                    });
            },
            update(location) {
                this.$firebaseRefs.location.update(location)
                    .then(() => {
                        this.$root.$toastSuccess(this.$t('item_saved_successfully'));
                    })
                    .catch(error => {
                        this.$root.$toastError(error.message);
                    });
            },
            confirmDelete(item) {
                this.$root.$deleteDialog(this.location.name, this.location, this.deleteItem);
            },
            deleteItem(item) {
                this.init = false;
                this.$firebaseRefs.locations.child(item['.key']).remove()
                    .then(() => {
                        this.$root.$toastSuccess(this.$t('delete_item_successfully'));
                        this.$router.push({
                            name: 'admin_journeys_location',
                            params: {
                                journey: this.$route.params.journey
                            }
                        });
                    })
                    .catch(error => {
                        this.init = true;
                        this.$root.$toastError(error.message);
                    });
            }
        },
        watch: {
            '$route'() {
                this.init = false;
                this.loadLocation();
            }
        }
    };
</script>
