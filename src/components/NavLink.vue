<template>
    <router-link :to="to" v-slot="{ href, navigate, isExactActive  }">
        <a :href="href" @click="navigate" :class="{ 'font-bold': isExactActive  }">
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