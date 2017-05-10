<template>
    <div class="card">
        <div class="toolbar">
            <i>terrain</i>
            <q-toolbar-title :padding="1">{{ $t('journeys_list') }}</q-toolbar-title>
            <router-link tag="button" class="primary" :to="{name: 'admin_journeys_detail'}">
                <i>add</i> {{ $t('journey_add') }}
            </router-link>
        </div>
        <div class="card-content">
            <q-data-table
                :data="items"
                :config="config"
                :columns="columns"
                @refresh="load"
                class="no-border"
            >
                <template slot="col-published" scope="cell">
                    <q-toggle class="primary" :value="cell.data" @input="confirmTogglePublish(cell, $event)"></q-toggle>
                </template>
                <template slot="col-.key" scope="cell">
                    <router-link tag="button" class="primary small" :to="{ name: 'admin_journeys_detail', params: { journey: cell.data } }">
                        <i>edit</i>
                        <q-tooltip>{{ $t('detail_view') }}</q-tooltip>
                    </router-link>
                    <button class="negative small" @click.prevent="confirmDelete(cell)">
                        <i>delete_forever</i>
                        <q-tooltip>{{ $t('delete_item') }}</q-tooltip>
                    </button>
                </template>
            </q-data-table>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'admin-journeys-list',
        firebase() {
            return {
                journeys: {
                    source: this.$root.$db().ref('journeys'),
                    cancelCallback: function () {},
                    readyCallback: function () {
                        this.load();
                    }
                }
            };
        },
        computed: {
            config() {
                return {
                    refresh: true,
                    columnPicker: true,
                    responsive: true,
                    pagination: {
                        rowsPerPage: 20,
                        options: [5, 10, 15, 20, 30, 50]
                    },
                    messages: {
                        noData: this.$t('table_no_data'),
                        noDataAfterFiltering: this.$t('table_no_data_after_filtering')
                    },
                    // (optional) Override default labels. Useful for I18n.
                    labels: {
                        columns: this.$t('columns'),
                        allCols: this.$t('all_columns'),
                        rows: this.$t('rows'),
                        selected: {
                            singular: this.$t('selected_singular'),
                            plural: this.$t('selected_plural')
                        },
                        clear: this.$t('clear'),
                        search: this.$t('search'),
                        all: this.$t('all')
                    }
                };
            },
            items() {
                return this.journeys;
            },
            columns() {
                return [
                    { label: this.$t('published'), field: 'published', sort: true, filter: true, width: '100px' },
                    { label: this.$t('language'), field: 'language', sort: true, filter: true },
                    { label: this.$t('title'), field: 'title', sort: true, filter: true },
                    {
                        label: this.$t('start_date'),
                        field: 'startDate',
                        sort: true,
                        filter: true,
                        format: (value, row) => new Date(value).toLocaleDateString()
                    },
                    {
                        label: this.$t('end_date'),
                        field: 'endDate',
                        sort: true,
                        filter: true,
                        format: (value, row) => new Date(value).toLocaleDateString()
                    },
                    { label: '', field: '.key', width: '100px', classes: 'text-right' },
                ];
            }
        },
        methods: {
            load(done) {
                this.$bindAsArray('journeys', this.$firebaseRefs.journeys);
                if (done) {
                    done();
                }
            },
            confirmTogglePublish(item, value) {
                this.$root.$publishDialog(item.row.title, item, value, this.togglePublish);
            },
            togglePublish(item, value) {
                this.$firebaseRefs.journeys.child(item.row['.key']).update({
                    published: value
                });
            },
            confirmDelete(item) {
                this.$root.$deleteDialog(item.row.title, item, this.deleteItem);
            },
            deleteItem(item) {
                this.$firebaseRefs.journeys.child(item.row['.key']).remove()
                    .then(() => {
                        this.$root.$toastSuccess(this.$t('delete_item_successfully'));
                    })
                    .catch(error => {
                        this.$root.$toastError(error.message);
                    });
            }
        }
    };
</script>
