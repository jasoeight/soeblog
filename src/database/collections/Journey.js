import moment from 'moment';
import marked from 'marked';
import { Utils } from 'quasar';

const LANGUAGE_DEFAULT = 'de_DE';
const PUBLISHED_DEFAULT = false;

const schema = {
    'title': 'journey schema',
    'description': 'describes a journey entry',
    'version': 0,
    'type': 'object',
    'properties': {
        'title': {
            'type': 'string'
        },
        'shortTeaser': {
            'type': 'string'
        },
        'longTeaser': {
            'type': 'string'
        },
        'description': {
            'type': 'string'
        },
        'startDate': {
            'type': 'string'
        },
        'endDate': {
            'type': 'string'
        },
        'createdDate': {
            'type': 'string'
        },
        'image': {
            'type': 'string'
        },
        'lang': {
            'type': 'string',
            'default': LANGUAGE_DEFAULT,
            'index': true
        },
        'published': {
            'type': 'boolean',
            'default': PUBLISHED_DEFAULT
        },
        'locations': {
            'type': 'array',
            'ref': 'location',
            'items': {
                'type': 'string'
            }
        }
    },
    'required': ['title', 'description']
};

export default {
    name: 'journey',
    schema: schema,
    statics: {
        getNewInstance(data = {}) {
            return this._createDocument(Object.assign(
                {
                    _id: Utils.uid(),
                    published: PUBLISHED_DEFAULT,
                    title: '',
                    shortTeaser: '',
                    longTeaser: '',
                    description: '',
                    startDate: '',
                    endDate: '',
                    createdDate: moment().format(),
                    image: '',
                    lang: LANGUAGE_DEFAULT,
                    locations: []
                },
                data
            ));
        },
        async findById(id) {
            return await this.findOne({'_id': {$eq: id}}).exec();
        }
    },
    methods: {
        hasLocations() {
            return this.getLocations().length > 0;
        },
        getLocations() {
            return this.locations || [];
        },
        getLocation(id) {
            if (id && this.hasLocation(id)) {
                return this.collection.database.location.findById(id);
            }

            return this.collection.database.location.getNewInstance();
        },
        addLocation(location) {
            let locations = this.locations;
            locations.push(location._id);
            this.locations = locations;
            return this;
        },
        hasLocation(id) {
            return this.locations.indexOf(id) !== -1;
        },
        deleteLocation(id) {
            if (this.hasLocation(id)) {
                const index = this.locations.indexOf(id);
                let locations = this.locations;
                locations.splice(index, 1);
                this.locations = locations;
            }

            return this;
        },
        getCloneData() {
            return {
                title: this.title,
                shortTeaser: this.shortTeaser,
                description: this.description,
                longTeaser: this.longTeaser,
                startDate: this.startDate,
                endDate: this.endDate,
                image: this.image,
                lang: this.lang,
                locations: this.locations
            };
        },
        getShortTeaser() {
            return marked(this.shortTeaser, { sanitize: true });
        },
        getLongTeaser() {
            return marked(this.longTeaser, { sanitize: true });
        },
        getDescription() {
            return marked(this.description, { sanitize: true });
        }
    },
    sync: true
};
