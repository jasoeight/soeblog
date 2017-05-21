import nominatim from './nominatim-client';

nominatim.global({
    useragent: 'SoeBlog',
    referer: 'http://example.com',
    email: 'jan.soehnitz@googlemail.com'
});

export default nominatim;
