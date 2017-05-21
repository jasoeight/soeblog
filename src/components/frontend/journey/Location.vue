<template>
    <div class="timeline-item">
        <div class="timeline-badge">
            <i>location_city</i>
        </div>
        <div class="timeline-title">{{ location.name }}</div>
        <router-link :to="locationRoute" tag="div" class="card bg-primary text-white cursor-pointer">
            <img v-if="location.image !== ''" :src="location.image" class="responsive">
            <div class="card-content" v-html="location.getTeaser()"></div>
            <div class="card-actions">
                <div>{{ startDate }}</div>
                <div class="auto"></div>
                <router-link :to="locationRoute" class="text-white">{{ $t('location_details') }}</router-link>
            </div>
        </router-link>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: 'frontend-journey-location',
        props: {
            location: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                momentStartDate: moment(this.location.startDate)
            };
        },
        computed: {
            startDate() {
                return this.momentStartDate.format('LL');
            },
            locationRoute() {
                return {
                    name: 'location',
                    params: {
                        journey: this.$route.params.journey,
                        location: this.location._id
                    }
                };
            }
        }
    };
</script>
