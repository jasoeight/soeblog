<template>
    <div class="list">
        <template v-for="link in links">
            <div class="item item-link no-padding no-margin" @click.prevent="link.show = !link.show">
                <i class="item-primary">{{ link.icon }}</i>
                <div class="item-content">{{ $t(link.label) }}</div>
            </div>
            <q-transition name="slide">
                <div v-if="link.show">
                    <template v-for="child in link.routes">
                        <router-link :to="child.route" class="item item-link drawer-closer cursor-pointer">
                            <i class="item-primary"></i>
                            <div class="item-content">{{ $t(child.label) }}</div>
                        </router-link>
                    </template>
                </div>
            </q-transition>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'admin-drawer-navigation',
        props: {
            links: {
                type: Array,
                required: true
            }
        },
        computed: {
            currentRoutePath () {
                return this.$route.path;
            }
        },
        methods: {
            setParentVisibilityBasedOnRoute (link) {
                link.routes.forEach(item => {
                    if (this.$route.name.indexOf(item.route.name) > -1) {
                        link.show = true;
                        return;
                    }
                });
            },
            toggleMenu(link) {
                link.show = !link.show;
            }
        },
        watch: {
            '$route.name' () {
                this.links.forEach(link => {
                    this.setParentVisibilityBasedOnRoute(link);
                });
            }
        },
        created() {
            this.links.forEach(link => {
                this.setParentVisibilityBasedOnRoute(link);
            });
        }
    };
</script>

<style scoped lang="stylus">
.list-label:first-child
    line-height 50px

.router-link-active
    color #027be3
    background-color #dadada !important
    border-right 2px solid #027be3
    .item-primary
        color: #027be3;
</style>
