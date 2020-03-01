<template>
    <router-link :to="to" v-slot="{ href, navigate, isExactActive  }">
        <a :href="href" @click="navigate" class="relative px-1 nav-link" :class="{ 'nav-link--active': isExactActive  }">
            <slot></slot>
        </a>
    </router-link>
</template>

<script>
    export default {
        name: "NavLink",
        props: {
            to: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss">
    .nav-link {
        &--active {
            @apply font-bold;

            &:after {
                content: '';
                @apply absolute w-full h-px bg-purple-500 bottom-0 left-0;
            }
        }
    }
</style>