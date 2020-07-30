<template>
    <div>
        <label class="text-sm text-gray-600">
            <input type="checkbox" class="hidden2" v-model="checkboxValue" />
            <slot></slot>
        </label>
    </div>
</template>

<script>
export default {
    name: "Checkbox",
    props: {
        value: Boolean,
    },
    computed: {
        checkboxValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit("input", val)
            },
        },
    },
}
</script>