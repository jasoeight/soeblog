<template>
    <div :class="widthCls">
        <div class="card full-height">
            <q-transition name="slide">
                <img :src="journey.image" class="resonsive cursor-pointer" v-if="!detail" @click="detail = true">
            </q-transition>
            <div class="card-content">
                <button v-if="detail" @click="detail = false" class="absolute-top-right">
                    <i>close</i>
                </button>
                <strong class="block">{{ journey.title }}</strong>
                <p v-if="!detail" v-html="journey.getShortTeaser()"></p>
                <p v-else v-html="journey.getLongTeaser()"></p>
                <div>
                    <router-link :to="{name: 'journey', params: {journey: journey._id}}">{{ $t('gotojourney') }}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'frontend-home-journey',
        props: {
            journey: {
                type: Object,
                required: true
            },
            widthCls: {
                type: String,
                default: 'width-1of3'
            }
        },
        data() {
            return {
                detail: false
            };
        }
    };
</script>
