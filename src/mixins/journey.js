import * as Database from 'src/database';

export default {
    data() {
        return {
            journey: {},
            notFound: false,
            isEdit: false
        };
    },
    methods: {
        async loadJourney(journeyId, copy = false) {
            const db = await Database.get();
            if (journeyId) {
                this.journey = await db.journey.findById(journeyId);
                if (this.journey === null) {
                    this.notFound = true;
                    return;
                }

                if (copy) {
                    this.journey = db.journey.getNewInstance(this.journey.getCloneData());
                }

                this.isEdit = true;
            } else {
                this.journey = db.journey.getNewInstance();
            }
        }
    }
};
