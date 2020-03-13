<template>
    <button
        v-bind="$attrs"
        v-on="$listeners"
        class="h-10 px-4 py-2 bg-gray-700 rounded min-w-24 disabled:opacity-25"
        :class="{ 'bg-gray-700': !alert, 'bg-red-900': alert }"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "Button",
    props: {
        alert: Boolean,
        loading: Boolean
    }
}
</script>