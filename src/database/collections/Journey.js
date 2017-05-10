const schema = {
    'title': 'journey schema',
    'description': 'describes a journey entry',
    'version': 0,
    'type': 'object',
    'properties': {
        'id': {
            'description': 'The unique identifier for a journey',
            'type': 'string',
            'primary': true
        },
        'title': {
            'type': 'string'
        },
        'description': {
            'type': 'string'
        },
        'startDate': {
            'type': 'string',
            'format': 'date-time'
        },
        'endDate': {
            'type': 'string',
            'format': 'date-time'
        },
        'createdDate': {
            'type': 'string',
            'format': 'date-time'
        },
        'image': {
            'type': 'string',
            'format': 'uri'
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
                                    'type': 'string',
                                    'format': 'uri'
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
                                    'type': 'string',
                                    'format': 'uri'
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
                                    'type': 'string',
                                    'format': 'uri'
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
                        'type': 'string',
                        'format': 'date-time'
                    },
                    'endDate': {
                        'type': 'string',
                        'format': 'date-time'
                    },
                    'createdDate': {
                        'type': 'string',
                        'format': 'date-time'
                    },
                    'description': {
                        'type': 'string'
                    },
                    'image': {
                        'type': 'string',
                        'format': 'uri'
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
    methods: {},
    sync: true
};
