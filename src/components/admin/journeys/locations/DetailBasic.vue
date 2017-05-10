<template>
    <div class="card-content">
        <div class="stacked-label h-form-field-margin-bottom">
            <input v-model="location.name" type="text" class="full-width">
            <label>{{ $t('name') }}</label>
        </div>
        <form-textarea :label="$t('description')" v-model="location.description"></form-textarea>
        <div class="row">
            <q-datetime
                :label="$t('start_date')"
                type="date"
                v-model="location.startDate"
                class="auto full-width h-form-field-margin-bottom"
            ></q-datetime>
            <q-datetime
                :label="$t('end_date')"
                type="date"
                v-model="location.endDate"
                class="auto full-width h-form-field-margin-bottom"
            ></q-datetime>
        </div>
        <div class="row medium-gutter">
            <div class="auto">
                <div class="stacked-label">
                    <input type="url" class="full-width" v-model="location.image">
                    <label>{{ $t('image') }}</label>
                </div>
            </div>
            <div v-if="location.image" class="maximized self-end">
                <button class="primary small" @click="$refs.image.open()">
                    <i>visibility</i>
                    <q-tooltip>{{ $t('preview') }}</q-tooltip>
                </button>
            </div>
        </div>
        <q-modal v-if="location.image" ref="image" :content-css="{maxWidth: '500px', maxHeight: '500px'}">
            <img :src="location.image" class="responsive">
        </q-modal>
        <label class="block h-form-field-margin-bottom">
            <q-toggle v-model="location.published"></q-toggle> {{ $t('published') }}
        </label>
    </div>
</template>

<script>
    import FormTextarea from 'src/components/admin/form/Textarea.vue';
    export default {
        name: 'admin-journeys-locations-detail-basic',
        components: {
            FormTextarea
        },
        props: {
            location: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                rows: 2
            };
        }
    };
</script>
