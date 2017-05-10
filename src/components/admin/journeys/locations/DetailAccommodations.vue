<template>
    <detail-form
        icon="hotel"
        :title="$t('accommodations')"
        :items="location.accommodations"
        :titleNew="$t('accommodation_new')"
        :additionalParamsCallback="addParams"
    >
        <template slot="fields-top" scope="props">
            <div class="row medium-gutter">
                <div class="auto">
                    <q-select
                        class="full-width no-padding"
                        :label="$t('type')"
                        type="list"
                        v-model="props.item.type"
                        :options="selectOptionsType"
                    ></q-select>
                </div>
                <div class="auto">
                    <div class="stacked-label">
                        <q-numeric v-model="props.item.duration" :min="0" class="full-width"></q-numeric>
                        <label class="q-picker-textfield-label">{{ $t('duration') }}</label>
                    </div>
                </div>
            </div>
        </template>
    </detail-form>
</template>

<script>
    import DetailForm from './Form.vue';

    export default {
        name: 'admin-journeys-locations-detail-accommodation',
        components: {
            DetailForm
        },
        props: {
            location: {
                type: Object,
                required: true
            }
        },
        computed: {
            selectOptionsType() {
                return [
                    { label: this.$t('campground'), value: 'campground' },
                    { label: this.$t('hotel'), value: 'hotel' },
                    { label: this.$t('motel'), value: 'motel' }
                ];
            }
        },
        methods: {
            addParams(params) {
                params.type = '';
                params.duration = 0;
                return params;
            }
        }
    };
</script>
