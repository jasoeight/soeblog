import moment from 'moment';
import { Utils } from 'quasar';
import marked from 'marked';
const PUBLISHED_DEFAULT = false;

const schema = {
    'title': 'location schema',
    'description': 'describes a location entry',
    'version': 0,
    'type': 'object',
    'properties': {
        'accommodations': {
            'type': 'array',
            'item': {
                'type': 'object',
                'properties': {
                    'description': {
                        'type': 'string'
                    },
                    'duration': {
                        'type': 'number',
                        'default': 0,
                        'min': 0
                    },
                    'images': {
                        'type': 'array',
                        'item': {
                            'type': 'object',
                            'properties': {
                                'link': {
                                    'type': 'string'
                                }
                            }
                        }
                    },
                    'link': {
                        'type': 'string'
                    },
                    'mapsSearchString': {
                        'type': 'string'
                    },
                    'name': {
                        'type': 'string'
                    },
                    'price': {
                        'type': 'number'
                    },
                    'type': {
                        'type': 'string'
                    },
                    'maps': {
                        'type': 'object'
                    }
                }
            }
        },
        'activities': {
            'type': 'array',
            'item': {
                'type': 'object',
                'properties': {
                    'description': {
                        'type': 'string'
                    },
                    'images': {
                        'type': 'array',
                        'item': {
                            'type': 'object',
                            'properties': {
                                'link': {
                                    'type': 'string'
                                }
                            }
                        }
                    },
                    'link': {
                        'type': 'string'
                    },
                    'mapsSearchString': {
                        'type': 'string'
                    },
                    'name': {
                        'type': 'string'
                    },
                    'price': {
                        'type': 'number'
                    },
                    'maps': {
                        'type': 'object'
                    }
                }
            }
        },
        'boards': {
            'type': 'array',
            'item': {
                'type': 'object',
                'properties': {
                    'description': {
                        'type': 'string'
                    },
                    'images': {
                        'type': 'array',
                        'item': {
                            'type': 'object',
                            'properties': {
                                'link': {
                                    'type': 'string'
                                }
                            }
                        }
                    },
                    'link': {
                        'type': 'string'
                    },
                    'mapsSearchString': {
                        'type': 'string'
                    },
                    'name': {
                        'type': 'string'
                    },
                    'price': {
                        'type': 'number'
                    },
                    'maps': {
                        'type': 'object'
                    }
                }
            }
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
        'teaser': {
            'type': 'string'
        },
        'description': {
            'type': 'string'
        },
        'image': {
            'type': 'string'
        },
        'published': {
            'type': 'boolean',
            'default': PUBLISHED_DEFAULT
        },
        'mapsSearchString': {
            'type': 'string'
        },
        'name': {
            'type': 'string'
        },
        'maps': {
            'type': 'object'
        }
    },
    'required': ['name', 'description']
};

export default {
    name: 'location',
    schema: schema,
    statics: {
        getNewInstance(data = {}) {
            return this._createDocument({
                _id: data._id || Utils.uid(),
                createdDate: data.createdDate || moment().format(),
                name: data.name || '',
                teaser: data.teaser || '',
                description: data.description || '',
                startDate: data.startDate || '',
                endDate: data.endDate || '',
                mapsSearchString: data.mapsSearchString || '',
                image: data.image || '',
                maps: data.maps || {},
                accommodations: data.accommodations || [],
                activities: data.activities || [],
                boards: data.boards || [],
                published: data.published || PUBLISHED_DEFAULT
            });
        },
        async findById(id, asNewInstance = false) {
            let instance = await this.findOne({'_id': {$eq: id}}).exec();
            if (asNewInstance) {
                instance = this.getNewInstance(instance);
            }
            return instance;
        }
    },
    methods: {
        getAccommodationsItem() {
            return {
                name: '',
                price: 0,
                description: '',
                link: '',
                mapsSearchString: '',
                maps: {},
                images: [],
                type: '',
                duration: 0
            };
        },
        getBoardsItem() {
            return {
                name: '',
                price: 0,
                description: '',
                link: '',
                mapsSearchString: '',
                maps: {},
                images: []
            };
        },
        getActivitiesItem() {
            return {
                name: '',
                price: 0,
                description: '',
                link: '',
                mapsSearchString: '',
                maps: {},
                images: []
            };
        },
        getTeaser() {
            return marked(this.teaser, { sanitize: true });
        },
        getDescription() {
            return marked(this.description, { sanitize: true });
        }
    },
    sync: true
};
