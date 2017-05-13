export default {
    methods: {
        confirmDeleteLocation(index) {
            const item = this.journey.getLocation(index);
            if (item) {
                this.$root.$deleteDialog(item.name, index, this.deleteItemLocation);
            }
        },
        deleteItemLocation(index) {
            this.journey.deleteLocation(index).save()
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
