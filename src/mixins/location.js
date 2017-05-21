export default {
    methods: {
        confirmDeleteLocation(location) {
            if (this.journey.hasLocation(location._id)) {
                this.$root.$deleteDialog(location.name, {
                    location
                }, this.deleteItemLocation);
            }
        },
        async deleteItemLocation(data) {
            const locationId = data.location._id;
            data.location.remove()
                .then(() => {
                    this.journey.deleteLocation(locationId).save();
                    if (typeof this.loadLocations === 'function') {
                        this.loadLocations();
                    }
                })
                .then(() => {
                    this.$root.$toastSuccess(this.$t('delete_item_successfully'));
                    if (typeof this.deleteItemLocationSuccess === 'function') {
                        this.deleteItemLocationSuccess();
                    }
                })
                .catch(error => {
                    this.$root.$toastError(error.message);
                });
        }
    }
};
