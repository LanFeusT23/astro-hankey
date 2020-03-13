<template>
    <div>
        <div class="mb-1 text-sm text-gray-600">{{ label }}</div>
        <div class="flex">
            <input
                class="px-3 py-2 mr-2 text-white bg-gray-800 rounded-lg outline-none min-w-64"
                type="date"
                v-model="dateValue"
            />
        </div>
    </div>
</template>

<script>
import { format } from "date-fns"
export default {
    name: "DateInput",
    props: {
        value: Date,
        label: String
    },
    computed: {
        dateValue: {
            get() {
                let dateFormatted = format(this.value, "yyyy-MM-dd")

                return dateFormatted
            },
            set(val) {
                let date = new Date(`${val}T00:00:00`)

                this.$emit("input", date)
            }
        }
    }
}
</script>