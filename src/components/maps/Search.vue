<template>
    <div>
        <div class="card-content">
            <div class="item multiple-lines">
                <div class="item-content has-secondary no-padding h-no-margin-left">
                    <div class="stacked-label">
                        <input
                            v-model="search"
                            @input="$emit('update:searchString', $event.target.value)"
                            @keydown.enter="searchLocation"
                            type="text"
                            class="full-width">
                        <label>{{ label }}</label>
                    </div>
                </div>
                <button class="item-secondary bg-primary text-white" @click.prevent="searchLocation">
                    <i>search</i>
                </button>
            </div>
        </div>
        <div class="list bordered inner-delimiter highlight">
            <div
                v-for="item in locationItems"
                class="item item-link multiple-lines"
                :class="{'bg-grey-3': selectedLocationId === item.place_id}"
                :key="item.place_id"
                @click="selectLocation(item)"
            >
                <img class="item-primary location__icon" :src="item.icon">
                <div class="item-content has-secondary">{{ item.display_name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import nominatim from 'src/openlayer/nominatim';
    export default {
        name: 'maps-search',
        props: {
            label: {
                type: String,
                required: true
            },
            value: {
                type: Object,
                require: true
            },
            searchString: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                search: this.searchString,
                locationItems: [],
                selectedLocationId: null,
                selectedLocation: null
            };
        },
        methods: {
            searchLocation() {
                if (!this.isLocationNameValid()) {
                    return;
                }

                this.locationItems = [];
                const query = {
                    q: this.search,
                    addressdetails: '1'
                };

                nominatim.search(query, (err, data) => {
                    if (err) {
                        throw err;
                    }

                    this.locationItems = data;
                });
            },
            isLocationNameValid() {
                if (!this.search || this.search.length < 5) {
                    this.$root.$toastNegative(this.$t('location_name_min_size', { length: 5 }));
                    return false;
                }

                return true;
            },
            selectLocation(item) {
                this.selectedLocationId = item.place_id;
                this.$emit('input', item);
            },
            setLocationItems() {
                this.locationItems = [];
                if (this.value && Object.keys(this.value).length > 0) {
                    this.locationItems.push(this.value);
                    this.selectLocation(this.value);
                }
            }
        },
        watch: {
            // value: 'setLocationItems',
            searchString() {
                this.search = this.searchString;
            }
        },
        created() {
            this.setLocationItems();
        }
    };
</script>

<style lang="stylus" scoped>
.location__icon
    height 25px!important
    width 25px!important
    top 13px!important
</style>
