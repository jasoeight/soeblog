<template>
    <ul class="no-padding no-margin">
        <li>
            <router-link :to="{name: 'home' }" class="hoverable hoverable-1">{{ $t('home') }}</router-link>
        </li>
        <li>
            <router-link :to="{name: 'home' }" class="hoverable">{{ $t('home') }}</router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'frontend-navigation'
    };
</script>
