<template>
    <div class="row medium-gutter">
        <div class="auto">
            <div class="stacked-label">
                <textarea
                    v-model="text"
                    class="full-width"
                    :rows="rows"
                    @focus="rows = 10"
                    @blur="rows = 3"
                    @input="update"
                ></textarea>
                <label>{{ label }}</label>
                <small v-html="$t('markdown_description')"></small>
            </div>
        </div>
        <div v-if="showPreview" class="width-1of2 self-stretch" style="max-height: 250px; overflow: auto;">
            <div v-html="preview"></div>
        </div>
        <div class="self-start">
            <button class="primary small" @click="showPreview = !showPreview">
                <i>visibility</i>
                <q-tooltip>{{ $t('preview') }}</q-tooltip>
            </button>
        </div>
    </div>
</template>

<script>
    import marked from 'marked';
    export default {
        name: 'admin-form-textarea',
        props: {
            value: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                rows: 3,
                text: '',
                showPreview: false
            };
        },
        computed: {
            preview() {
                return marked(this.text, { sanitize: true });
            }
        },
        methods: {
            update($event) {
                this.$emit('input', $event.target.value);
            }
        },
        created() {
            this.text = this.value;
        }
    };
</script>
