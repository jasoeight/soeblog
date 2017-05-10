<template>
    <div class="map" :class="[size]">
        <vl-map ref="map">
            <vl-view :center="map.center" :zoom="map.zoom" :rotation="map.rotation"></vl-view>
            <vl-layer-tile>
                <vl-source-osm></vl-source-osm>
            </vl-layer-tile>
            <vl-layer-vector :v-if="markers">
                <vl-source-vector :features="markers"></vl-source-vector>
            </vl-layer-vector>
        </vl-map>
    </div>
</template>

<script>
    // import { Utils } from 'quasar';
    export default {
        name: 'maps-card',
        props: {
            longitude: {
                required: true
            },
            latitude: {
                required: true
            },
            zoom: {
                type: Number,
                default: 10
            },
            rotation: {
                type: Number,
                default: 0
            },
            size: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                map: {
                    zoom: this.zoom,
                    center: [parseFloat(this.longitude), parseFloat(this.latitude)],
                    rotation: this.rotation
                },
                markers: []
            };
        },
        methods: {
            update() {
                const position = [parseFloat(this.longitude), parseFloat(this.latitude)];
                this.map.center = position;
                this.map.zoom = this.zoom;
                /*
                this.$set(this, 'markers', [{
                    'id': Utils.uid(),
                    'type': 'Feature',
                    'geometry': {
                        coordinates: position
                    }
                }]);
                */
            }
        },
        watch: {
            'longitude': 'update',
            'latitude': 'update',
            'zoom': 'update'
        },
        created() {
            this.update();
        }
    };
</script>
