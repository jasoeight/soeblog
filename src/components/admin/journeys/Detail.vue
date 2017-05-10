<template>
    <div>
        <q-progress v-if="!init" style="height: 45px" class="indeterminate stripe"></q-progress>
        <div class="card" v-else>
            <div class="toolbar">
                <button v-if="isEdit" class="circular small" @click.prevent="showBasic = !showBasic, showLocations = false">
                    <i v-if="showBasic">keyboard_arrow_down</i>
                    <i v-else>keyboard_arrow_up</i>
                </button>
                <q-toolbar-title :padding="1">{{ title }}</q-toolbar-title>
            </div>
            <q-transition name="slide">
                <div v-show="showBasic">
                    <div class="card-content">
                        <q-select
                            :label="$t('language')"
                            type="list"
                            v-model="journey.language"
                            :options="languages"
                            class="block h-form-field-margin-bottom"
                        ></q-select>
                        <div class="stacked-label h-form-field-margin-bottom">
                            <input class="full-width" v-model="journey.title">
                            <label>{{ $t('title') }}</label>
                        </div>
                        <form-textarea :label="$t('description')" v-model="journey.description"></form-textarea>
                        <div class="row">
                            <q-datetime
                                :label="$t('start_date')"
                                type="date"
                                v-model="journey.startDate"
                                class="auto full-width h-form-field-margin-bottom"
                            ></q-datetime>
                            <q-datetime
                                :label="$t('end_date')"
                                type="date"
                                v-model="journey.endDate"
                                class="auto full-width h-form-field-margin-bottom"
                            ></q-datetime>
                        </div>
                        <div class="row medium-gutter">
                            <div class="auto">
                                <div class="stacked-label">
                                    <input type="url" class="full-width" v-model="journey.image">
                                    <label>{{ $t('image') }}</label>
                                </div>
                            </div>
                            <div v-if="journey.image" class="maximized self-end">
                                <button class="primary small" @click="$refs.image.open()">
                                    <i>visibility</i>
                                    <q-tooltip>{{ $t('preview') }}</q-tooltip>
                                </button>
                            </div>
                        </div>
                        <q-modal v-if="journey.image" ref="image" :content-css="{maxWidth: '500px', maxHeight: '500px'}">
                            <img :src="journey.image" class="responsive">
                        </q-modal>
                        <label class="block h-form-field-margin-bottom">
                            <q-toggle v-model="journey.published"></q-toggle> {{ $t('published') }}
                        </label>
                    </div>
                    <div class="card-actions">
                        <div class="auto"></div>
                        <div>
                            <button class="primary" @click.prevent="save">
                                <i class="on-left">save</i> {{ $t('save') }}
                            </button>
                        </div>
                    </div>
                </div>
            </q-transition>
            <div v-if="isEdit" class="toolbar">
                <button class="primary" @click.prevent="showBasic = false, showLocations = true">
                    <i class="on-left">location_on</i> {{ $t('locations') }}
                </button>
            </div>
            <q-transition name="slide">
                <locations v-if="isEdit && showLocations" :journey="journey"></locations>
            </q-transition>
        </div>
    </div>
</template>

<script>
    import Locations from './locations/List.vue';
    import FormTextarea from 'src/components/admin/form/Textarea.vue';
    import moment from 'moment';
    export default {
        name: 'admin-journeys-detail',
        components: {
            Locations,
            FormTextarea
        },
        firebase() {
            return {
                journeys: {
                    source: this.$root.$db().ref(`journeys`),
                    cancelCallback: function () {},
                    readyCallback: function () {
                        this.loadJourney();
                    }
                }
            };
        },
        data() {
            return {
                journey: {},
                init: false,
                showBasic: true,
                showLocations: false,
                isEdit: false
            };
        },
        computed: {
            title() {
                return this.$route.params.journey ? this.$t('journey_edit') : this.$t('journey_add');
            },
            languages() {
                return [
                    { label: this.$t('english'), value: 'en_US' },
                    { label: this.$t('german'), value: 'de_DE' }
                ];
            }
        },
        methods: {
            setStartDate(value) {
                this.journey.startDate = value;
            },
            setEndDate(value) {
                this.journey.endDate = value;
            },
            loadJourney() {
                if (this.$route.params.journey) {
                    this.$bindAsObject('journey', this.$firebaseRefs.journeys.child(this.$route.params.journey));
                    this.isEdit = true;
                }

                this.$set(this.journey, 'createdDate', this.journey.createdDate || moment().format());
                this.$set(this.journey, 'language', this.journey.language || 'en_US');
                this.$set(this.journey, 'title', this.journey.title || '');
                this.$set(this.journey, 'startDate', this.journey.startDate || '');
                this.$set(this.journey, 'endDate', this.journey.endDate || '');
                this.$set(this.journey, 'image', this.journey.image || '');
                this.$set(this.journey, 'description', this.journey.description || '');
                this.$set(this.journey, 'published', this.journey.published || false);
                this.init = true;
            },
            save() {
                let journey = this.journey;
                delete journey['.key'];
                if (this.$route.params.journey) {
                    this.update(journey);
                } else {
                    this.add(journey);
                }
            },
            add(journey) {
                this.$firebaseRefs.journeys.push(journey)
                    .then(data => {
                        this.$root.$toastSuccess(this.$t('item_saved_successfully'));
                        this.$router.push({
                            name: 'admin_journeys_detail',
                            params: {
                                journey: data.key
                            }
                        });
                    })
                    .catch(error => {
                        this.$root.$toastError(error.message);
                    });
            },
            update(journey) {
                this.$firebaseRefs.journey.update(journey)
                    .then(() => {
                        this.$root.$toastSuccess(this.$t('item_saved_successfully'));
                    })
                    .catch(error => {
                        this.$root.$toastError(error.message);
                    });
            }
        },
        watch: {
            '$route'() {
                this.init = false;
                this.loadJourney();
            }
        }
    };
</script>
