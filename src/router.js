import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

function load (component) {
    return () => System.import(`components/${component}.vue`);
};

export default new VueRouter({
    /*
     * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
     * it is only to be used only for websites.
     *
     * If you decide to go with "history" mode, please also open /config/index.js
     * and set "build.publicPath" to something other than an empty string.
     * Example: '/' instead of current ''
     *
     * If switching back to default "hash" mode, don't forget to set the
     * build publicPath back to '' so Cordova builds work again.
     */
    routes: [
        { path: '/', name: 'home', component: load('frontend/Index') },
        { path: '/login', name: 'login', component: load('authentication/Login') },
        {
            path: '/admin',
            name: 'admin',
            component: load('admin/Index'),
            children: [
                {
                    path: 'user/profile',
                    name: 'admin_user_profile',
                    component: load('admin/user/Profile')
                },
                {
                    path: 'journeys',
                    component: load('admin/journeys/Index'),
                    children: [
                        {
                            path: '',
                            name: 'admin_journeys',
                            component: load('admin/journeys/List')
                        },
                        {
                            path: 'detail/:journey?',
                            name: 'admin_journeys_detail',
                            component: load('admin/journeys/Detail')
                        },
                        {
                            path: 'detail/:journey/copy',
                            name: 'admin_journeys_copy',
                            component: load('admin/journeys/Detail')
                        },
                        {
                            path: 'detail/:journey/location/:location?',
                            name: 'admin_journeys_location',
                            component: load('admin/journeys/locations/Detail')
                        },
                    ]
                }
            ]
        },
        { path: '*', component: load('Error404') } // Not found
    ]
});
