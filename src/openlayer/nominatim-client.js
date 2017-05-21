import http from 'http';
const API_ENDPOINT = 'nominatim.openstreetmap.org';
let global = {};

const toEncodeUri = function(params, done) {
    params.format = params.format || 'json';
    params.useragent = params.useragent || 'NodeJS request';

    let paramsQuery = [];

    for (let i in global) {
        paramsQuery.push(i + '=' + encodeURIComponent(global[i]));
    }

    for (let i in params) {
        paramsQuery.push(i + '=' + encodeURIComponent(params[i]));
    }

    return paramsQuery.join('&');
};

const query = function(path, done) {
    http.get({
        host: API_ENDPOINT,
        path: path
    }, function(res) {
        let output = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            output += chunk;
        });
        res.on('end', function() {
            try {
                done(false, output, path);
            } catch (e) {
                done(e, output, path);
            }
        });
    }).on('error', function(e) {
        done(e, null, path, null);
    });
};

const queryDone = function(params, done) {
    return function(err, data, path) {
        if (err) {
            return done(err);
        }

        if (params.format === 'json') {
            data = JSON.parse(data);
        }

        done(false, data, path);
    };
};

export default {
    global: function(globals, value) {
        global = globals;
    },

    search: function(params, done) {
        query('/?' + toEncodeUri(params), queryDone(params, done));
    },

    reverse: function(params, done) {
        params.zoom = params.zoom || 18;
        query('/reverse?' + toEncodeUri(params), queryDone(params, done));
    },
};
