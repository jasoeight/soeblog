<template>
    <div v-if="journeys.length > 0" class="layout-padding small-content">
        <h2 class="text-primary">{{ $t('other_journeys') }}</h2>
        <div class="row items-center medium-gutter">
            <div class="width-4of5">
                <carousel v-if="init" :perPage="3" :paginationEnabled="false" ref="carousel">
                    <slide v-for="journey in journeys" :key="journey._id">
                        <div class="generic-margin">
                            <div class="card">
                                <img :src="journey.image" height="150px" class="resonsive cursor-pointer">
                                <div class="card-content">
                                    <strong class="block">{{ journey.title }}</strong>
                                    <div>
                                        <router-link :to="{name: 'journey', params: {journey: journey._id}}">{{ $t('gotojourney') }}</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </slide>
                </carousel>
            </div>
            <div class="width-1of5 text-center">
                <button class="primary circular" @click="triggerPageAdvance('backward')">
                    <i>keyboard_arrow_left</i>
                </button><br><br>
                <button class="primary circular" @click="triggerPageAdvance()">
                    <i>keyboard_arrow_right</i>
                </button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import * as Database from 'src/database';
    import { Carousel, Slide } from 'vue-carousel';

    export default {
        name: 'frontend-journey-other-journeys',
        components: {
            Carousel,
            Slide
        },
        data() {
            return {
                journeys: [],
                init: false
            };
        },
        methods: {
            triggerPageAdvance(direction) {
                this.$refs.carousel.advancePage(direction);
            }
        },
        async mounted() {
            const db = await Database.get();
            db.journey
                .find({
                    lang: {$eq: this.$store.getters['user/language']},
                    published: true,
                    _id: {$ne: this.$route.params.journey}
                }).$
                .subscribe(documents => {
                    this.journeys = documents;
                    this.init = true;
                });
        }
    };
</script>
