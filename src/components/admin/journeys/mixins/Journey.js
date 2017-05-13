import * as Database from 'src/database';
import moment from 'moment';

export default {
    data() {
        return {
            journey: {},
            notFound: false,
            isEdit: false
        };
    },
    methods: {
        async loadJourney(journeyId) {
            if (journeyId) {
                const db = await Database.get();
                this.journey = await db.journeys.findOne({'_id': {$eq: journeyId}}).exec();
                if (this.journey === null) {
                    this.notFound = true;
                    return;
                }
                this.isEdit = true;
            }

            this.prepareJourney();
        },
        prepareJourney() {
            this.$set(this.journey, 'createdDate', this.journey.createdDate || moment().format());
            this.$set(this.journey, 'lang', this.journey.lang || 'en_US');
            this.$set(this.journey, 'title', this.journey.title || '');
            this.$set(this.journey, 'startDate', this.journey.startDate || '');
            this.$set(this.journey, 'endDate', this.journey.endDate || '');
            this.$set(this.journey, 'image', this.journey.image || '');
            this.$set(this.journey, 'description', this.journey.description || '');
            this.$set(this.journey, 'published', this.journey.published || false);
            this.$set(this.journey, 'locations', this.journey.locations || []);
        },
        async insert() {
            const db = await Database.get();
            db.journeys.insert(this.journey)
                .then(data => {
                    this.journey = data;
                    this.$root.$toastSuccess(this.$t('item_saved_successfully'));
                    this.$router.push({
                        name: 'admin_journeys_detail',
                        params: {
                            journey: data._id
                        }
                    });
                })
                .catch(error => {
                    this.$root.$toastError(error.message);
                });
        },
        update() {
            this.journey.save()
                .then(() => {
                    this.$root.$toastSuccess(this.$t('item_saved_successfully'));
                })
                .catch(error => {
                    this.$root.$toastError(error.message);
                });
        }
    }
};
