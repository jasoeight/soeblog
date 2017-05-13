import moment from 'moment';

const schema = {
    'title': 'journey schema',
    'description': 'describes a journey entry',
    'version': 0,
    'type': 'object',
    'properties': {
        'title': {
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
            'default': 'de_DE',
            'index': true
        },
        'published': {
            'type': 'boolean',
            'default': false
        },
        'locations': {
            'type': 'array',
            'item': {
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
                    'description': {
                        'type': 'string'
                    },
                    'image': {
                        'type': 'string'
                    },
                    'published': {
                        'type': 'boolean',
                        'default': false
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
                }
            }
        }
    },
    'required': ['title', 'description']
};

export default {
    name: 'journeys',
    schema: schema,
    methods: {
        getLocations() {
            return this.locations || [];
        },
        hasLocation(index) {
            return typeof this.locations[index] !== 'undefined';
        },
        getLocation(index, withDefaults = false) {
            let location = this.locations[index] || null;
            if (!withDefaults) {
                return location;
            }

            if (location === null) {
                location = {};
            }

            location.createdDate = location.createdDate || moment().format();
            location.name = location.name || '';
            location.description = location.description || '';
            location.startDate = location.startDate || '';
            location.endDate = location.endDate || '';
            location.mapsSearchString = location.mapsSearchString || '';
            location.image = location.image || '';
            location.maps = location.maps || {};
            location.accommodations = location.accommodations || [];
            location.activities = location.activities || [];
            location.boards = location.boards || [];
            location.published = location.published || false;

            return location;
        },
        deleteLocation(index) {
            if (this.hasLocation(index)) {
                let locations = this.locations;
                locations.splice(index, 1);
                this.locations = locations;
            }

            return this;
        },
        addLocation(location) {
            let locations = this.locations;
            locations.push(location);
            this.locations = locations;
            return this;
        },
        updateLocation(index, location) {
            let locations = this.locations;
            locations[index] = location;
            this.locations = locations;
            return this;
        },
        getLastLocationIndex() {
            return this.locations.length - 1;
        },
        clone() {
            return {
                title: this.title,
                description: this.description,
                startDate: this.startDate,
                endDate: this.endDate,
                createdDate: moment().format(),
                image: this.image,
                lang: this.lang,
                published: false,
                locations: this.locations
            };
        }
    },
    sync: true
};
