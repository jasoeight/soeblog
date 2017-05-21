<template>
    <div>
        <q-progress v-if="!init" style="height: 45px" class="indeterminate stripe"></q-progress>
        <div v-else-if="notFound" class="card bg-negative text-white">
            <div class="card-content">
                {{ $t('item_not_found') }}
            </div>
        </div>
        <div class="card" v-else>
            <div class="toolbar">
                <button v-if="isEdit" class="circular small" @click.prevent="showBasic = !showBasic, showLocations = false">
                    <i v-if="showBasic">keyboard_arrow_down</i>
                    <i v-else>keyboard_arrow_up</i>
                </button>
                <q-toolbar-title :padding="1">{{ title }}</q-toolbar-title>
                <button v-if="$route.params.journey && !isCopy" class="primary" @click="copy()"><i>content_copy</i> {{ $t('copy') }}</button>
            </div>
            <q-transition name="slide">
                <div v-show="showBasic">
                    <div class="card-content">
                        <q-select
                            :label="$t('language')"
                            type="list"
                            v-model="journey.lang"
                            :options="languages"
                            class="block h-form-field-margin-bottom"
                        ></q-select>
                        <div class="stacked-label h-form-field-margin-bottom">
                            <input class="full-width" v-model="journey.title">
                            <label>{{ $t('title') }}</label>
                        </div>
                        <form-textarea :label="$t('short_teaser')" v-model="journey.shortTeaser"></form-textarea>
                        <form-textarea :label="$t('long_teaser')" v-model="journey.longTeaser"></form-textarea>
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
            <div v-if="isEdit && !isCopy" class="toolbar">
                <button class="primary" @click.prevent="showBasic = false, showLocations = true">
                    <i class="on-left">location_on</i> {{ $t('locations') }}
                </button>
            </div>
            <q-transition name="slide">
                <locations v-if="isEdit && !isCopy && showLocations" :journey="journey"></locations>
            </q-transition>
        </div>
    </div>
</template>

<script>
    import Locations from './locations/List.vue';
    import FormTextarea from 'src/components/admin/form/Textarea.vue';
    import JourneyMixin from 'src/mixins/journey';
    export default {
        name: 'admin-journeys-detail',
        mixins: [ JourneyMixin ],
        components: {
            Locations,
            FormTextarea
        },
        data() {
            return {
                init: false,
                showBasic: true,
                showLocations: false
            };
        },
        computed: {
            title() {
                if (this.$route.params.journey) {
                    if (this.isCopy) {
                        return this.$t('journey_copy');
                    }

                    return this.$t('journey_edit');
                }

                return this.$t('journey_add');
            },
            languages() {
                return [
                    { label: this.$t('english'), value: 'en_US' },
                    { label: this.$t('german'), value: 'de_DE' }
                ];
            },
            isCopy() {
                return this.$route.name === 'admin_journeys_copy';
            }
        },
        methods: {
            setStartDate(value) {
                this.journey.startDate = value;
            },
            setEndDate(value) {
                this.journey.endDate = value;
            },
            save() {
                this.journey.save()
                    .then(() => {
                        this.$root.$toastSuccess(this.$t('item_saved_successfully'));
                        if (!this.$route.params.journey || this.isCopy) {
                            this.$router.push({
                                name: 'admin_journeys_detail',
                                params: {
                                    journey: this.journey._id
                                }
                            });
                        }
                    })
                    .catch(error => {
                        this.$root.$toastError(error.message);
                    });
            },
            copy() {
                this.$router.push({
                    name: 'admin_journeys_copy',
                    params: {
                        journey: this.$route.params.journey
                    }
                });
            }
        },
        watch: {
            async '$route'() {
                this.init = false;
                await this.loadJourney(this.$route.params.journey, this.isCopy);
                this.init = true;
            }
        },
        async mounted() {
            await this.loadJourney(this.$route.params.journey, this.isCopy);
            this.init = true;
        }
    };
</script>
