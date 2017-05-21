<template>
    <layout>
        <div v-if="!init" class="layout-padding">
            <q-progress style="height: 45px" class="indeterminate stripe"></q-progress>
        </div>
        <div v-else-if="notFound" class="layout-padding">
            <div  class="card bg-negative text-white">
                <div class="card-content">
                    {{ $t('item_not_found') }}
                </div>
            </div>
        </div>
        <template v-else>
            <q-parallax :src="location.image" :height="450">
                <spinner slot="loading" :size="60"></spinner>
                <h1>{{ location.name }}</h1>
            </q-parallax>
            <p class="layout-padding small-content" v-html="location.getDescription()"></p>
        </template>
    </layout>
</template>

<script>
    import Layout from './Layout.vue';
    import * as Database from 'src/database';

    export default {
        name: 'frontend-location',
        components: {
            Layout
        },
        data() {
            return {
                location: {},
                init: false,
                notFound: false
            };
        },
        methods: {
            async loadLocation() {
                this.init = false;
                const db = await Database.get();
                this.location = await db.location.findById(this.$route.params.location);
                if (this.location === null) {
                    this.notFound = true;
                    this.init = true;
                    return;
                }

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
