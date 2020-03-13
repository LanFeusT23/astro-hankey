<template>
    <div>
        <div class="mb-1 text-sm text-gray-600">{{ label }}</div>
        <input
            class="px-3 py-2 text-white bg-gray-800 rounded-lg outline-none min-w-64"
            type="text"
            v-model="textValue"
            :placeholder="placeholder"
        />
    </div>
</template>

<script>
export default {
    name: "TextInput",
    props: {
        value: String,
        placeholder: String,
        label: String
    },
    computed: {
        textValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit("input", val)
            }
        }
    }
}
</script>