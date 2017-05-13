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
            <detail-title :journey="journey"></detail-title>
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
    import DetailTitle from './DetailTitle.vue';
    import DetailBasic from './DetailBasic.vue';
    import DetailMaps from './DetailMaps.vue';
    import DetailAccommodations from './DetailAccommodations.vue';
    import DetailActivities from './DetailActivities.vue';
    import DetailBoard from './DetailBoard.vue';
    import JourneyMixin from '../mixins/Journey';

    export default {
        name: 'admin-journeys-locations-detail',
        mixins: [ JourneyMixin ],
        components: {
            DetailTitle,
            DetailBasic,
            DetailMaps,
            DetailAccommodations,
            DetailActivities,
            DetailBoard
        },
        data() {
            return {
                location: {},
                init: false,
                notFound: false,
                isEdit: false
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
            save() {
                if (typeof this.locationIndex !== 'undefined') {
                    this.update();
                } else {
                    this.add();
                }
            },
            add() {
                this.journey.addLocation(this.location).save()
                    .then(() => {
                        this.$root.$toastSuccess(this.$t('item_saved_successfully'));
                        this.$router.push({
                            name: 'admin_journeys_location',
                            params: {
                                journey: this.$route.params.journey,
                                location: this.journey.getLastLocationIndex()
                            }
                        });
                    })
                    .catch(error => {
                        this.$root.$toastError(error.message);
                    });
            },
            update(index, location) {
                this.journey.updateLocation(this.locationIndex, this.location).save()
                    .then(() => {
                        this.$root.$toastSuccess(this.$t('item_saved_successfully'));
                    })
                    .catch(error => {
                        this.$root.$toastError(error.message);
                    });
            },
            async loadLocation() {
                this.init = false;
                await this.loadJourney(this.$route.params.journey);
                if (this.locationIndex && !this.journey.hasLocation(this.locationIndex)) {
                    this.notFound = true;
                    this.init = true;
                    return;
                }

                this.location = this.journey.getLocation(this.locationIndex, true);
                this.init = true;
            }
        },
        watch: {
            '$route': 'loadLocation'
        },
        mounted() {
            this.loadLocation();
        }
    };
</script>
