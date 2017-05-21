<template>
    <div>
        <div class="toolbar">
            <i>{{ icon }}</i>
            <q-toolbar-title :padding="1">{{ title }}</q-toolbar-title>
            <button class="primary" @click="add()"><i>add</i> {{ $t('add') }}</button>
        </div>
        <div class="list">
            <template v-for="(item, index) in items">
                <div class="toolbar bg-grey-3 text-black">
                    <button @click="toggleShowState(index)">
                        <i class="item-secondary">{{ showStates[index] ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</i>
                    </button>
                    <q-toolbar-title class="toolbar__collapse" :padding="1">{{ item.name || titleNew }}</q-toolbar-title>
                    <button class="negative" @click="confirmDelete(index)">
                        <i class="item-secondary">delete</i>
                        <q-tooltip>{{ $t('delete') }}</q-tooltip>
                    </button>
                </div>
                <q-transition name="slide">
                    <div v-if="showStates[index]" class="item multiple-lines">
                        <div class="item-content">
                            <slot name="fields-top" :item="item" :index="index"></slot>
                            <div class="row medium-gutter">
                                <div class="auto">
                                    <div class="stacked-label">
                                        <input type="text" v-model="item.name" class="full-width">
                                        <label>{{ $t('name') }}</label>
                                    </div>
                                </div>
                                <div class="width-1of5">
                                    <div class="stacked-label">
                                        <input type="number" v-model="item.price" class="full-width" step="0.01">
                                        <label>{{ $t('total_price') }}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row medium-gutter">
                                <div class="auto">
                                    <div class="stacked-label">
                                        <input type="url" v-model="item.link" class="full-width">
                                        <label>{{ $t('link') }}</label>
                                    </div>
                                </div>
                            </div>
                            <form-textarea :label="$t('description')" v-model="item.description"></form-textarea>
                            <slot name="fields-bottom" :item="item" :index="index"></slot>
                            <div class="row medium-gutter">
                                <div class="map width-1of4">
                                    <map-card
                                        :longitude="maps[index].longitude"
                                        :latitude="maps[index].latitude"
                                        :zoom="maps[index].zoom"
                                    ></map-card>
                                </div>
                                <div class="auto">
                                    <map-search
                                        :label="$t('address')"
                                        :searchString.sync="item.mapsSearchString"
                                        v-model="item.maps"
                                        @input="updateMap(index, $event)"
                                    ></map-search>
                                </div>
                            </div>
                            <div class="list item-delimiter">
                                <div class="toolbar bg-grey-3 text-black no-padding">
                                    <q-toolbar-title class="toolbar__collapse" :padding="1">{{ $t('images') }}</q-toolbar-title>
                                    <button v-if="item.images" class="positive" @click="showImagePreview(index)">
                                        <i class="item-secondary">visibility</i>
                                        <q-tooltip>{{ $t('preview') }}</q-tooltip>
                                    </button>
                                    <button class="primary" @click="addImage(item)">
                                        <i class="item-secondary">add</i>
                                        <q-tooltip>{{ $t('add') }}</q-tooltip>
                                    </button>
                                </div>
                                <div v-for="(image, imageIndex) in item.images" class="item multiple-lines">
                                    <div class="toolbar inverted">
                                        <q-toolbar-title class="toolbar__collapse" :padding="1">
                                            <input type="url" v-model="image.link" class="full-width">
                                        </q-toolbar-title>
                                        <button class="negative" @click="deleteImage(item, imageIndex)">
                                            <i class="item-secondary">delete</i>
                                            <q-tooltip>{{ $t('delete') }}</q-tooltip>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <q-modal v-if="item.images" :ref="getImageRefName(index)" :content-css="{maxWidth: '500px', maxHeight: '500px'}">
                                <q-gallery-slider
                                    infinite autoplay dots fullscreen
                                    :src="getItemImages(item.images)"
                                ></q-gallery-slider>
                            </q-modal>
                        </div>
                    </div>
                </q-transition>
            </template>
        </div>
    </div>
</template>

<script>
    import MapSearch from 'src/components/maps/Search.vue';
    import MapCard from 'src/components/maps/Card.vue';
    import FormTextarea from 'src/components/admin/form/Textarea.vue';

    export default {
        name: 'admin-journeys-locations-detail-form',
        components: {
            MapSearch,
            MapCard,
            FormTextarea
        },
        props: {
            location: {
                type: Object,
                required: true
            },
            locationRxdb: {
                type: Object,
                required: true
            },
            listKey: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            titleNew: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                showStates: [],
                maps: [],
                rows: 2
            };
        },
        computed: {
            items() {
                return this.location[this.listKey];
            }
        },
        methods: {
            add() {
                const key = this.listKey.charAt(0).toUpperCase() + this.listKey.slice(1);
                const items = this.items;
                items.push(this.locationRxdb[`get${key}Item`]());
                this.location[this.listKey] = items;
                this.addMap();
                this.$set(this.showStates, this.showStates.length, true);
            },
            toggleShowState(index) {
                this.$set(this.showStates, index, !this.showStates[index]);
            },
            confirmDelete(index) {
                this.$root.$deleteDialog(this.items[index].name, index, this.deleteItem);
            },
            deleteItem(index) {
                this.items.splice(index, 1);
                this.showStates.splice(index, 1);
                this.maps.splice(index, 1);
            },
            addMap(longitude = 6.7185413, latitude = 51.2281, zoom = 8) {
                this.$set(this.maps, this.maps.length, {
                    zoom,
                    longitude,
                    latitude
                });
            },
            updateMap(index, mapData) {
                this.maps[index].latitude = mapData.lat;
                this.maps[index].longitude = mapData.lon;
            },
            updateData() {
                this.$set(this, 'maps', []);
                if (this.items) {
                    this.items.forEach((item, index) => {
                        this.$set(this.showStates, index, false);
                        if (item.maps && Object.keys(item.maps).length > 0) {
                            this.addMap(item.maps.lon, item.maps.lat);
                        } else {
                            this.addMap();
                        }
                    });
                }
            },
            addImage(item) {
                if (!item.images) {
                    this.$set(item, 'images', []);
                }

                this.$set(item.images, item.images.length, {
                    link: ''
                });
            },
            deleteImage(item, index) {
                this.$delete(item.images, index);
            },
            getItemImages(images) {
                const links = [];
                images.forEach(image => {
                    links.push(image.link);
                });
                return links;
            },
            getImageRefName(index) {
                return `imagePreview${index}`;
            },
            showImagePreview(index) {
                this.$refs[this.getImageRefName(index)][0].open();
            }
        },
        watch: {
            item: 'updateData'
        },
        created() {
            this.updateData();
        }
    };
</script>
