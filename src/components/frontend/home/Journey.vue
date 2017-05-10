<template>
    <div class="width-1of3 card">
        <img :src="journey.image" class="resonsive">
        <div class="card-content" v-html="description"></div>
    </div>
</template>

<script>
    import marked from 'marked';
    export default {
        name: 'frontend-home-journey',
        props: {
            journey: {
                type: Object,
                required: true
            }
        },
        computed: {
            description() {
                return marked(this.journey.description, { sanitize: true });
            }
        }
    };
</script>
