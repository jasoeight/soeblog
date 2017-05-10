<template>
    <button class="primary">
        <i>language</i> {{ languageAsString }}
        <q-popover ref="popover">
            <div class="list item-delimiter highlight no-padding no-margin">
                <div class="item item-link" :class="{ 'bg-grey-3': $store.getters['user/language'] === 'en_US' }" @click="select('en_US')">
                    <div class="item-content">English</div>
                </div>
                <div class="item item-link" :class="{ 'bg-grey-3': $store.getters['user/language'] === 'de_DE' }" @click="select('de_DE')">
                    <div class="item-content">Deutsch</div>
                </div>
            </div>
        </q-popover>
    </button>
</template>

<script>
    export default {
        name: 'admin-user-language',
        computed: {
            languageAsString() {
                return this.$store.getters['user/language'] === 'en_US' ? 'EN' : 'DE';
            }
        },
        methods: {
            select(language) {
                this.$store.dispatch('user/language', language);
                this.$refs.popover.close();
            }
        }
    };
</script>
