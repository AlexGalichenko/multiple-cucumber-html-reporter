<template>
    <div class="dropdown">
        <div v-show="isVisible" class="dropdown-menu">
            <div v-for="status in statusList" class="dropdown-item">
                <input v-model="statusChecked" @change="filter" type="checkbox" :id="status" :value="status" class="form-check-input pointer">
                <label :for="status" class="pointer">{{status}}</label>
            </div>
        </div>
    </div>
</template>

<script>
    const defaultList = [
        "Passed",
        "Failed",
        "Skipped",
        "Pending",
        "Undefined"
    ];
    export default {
        name: "StatusFilter",
        data() {
            return {
                statusList: [...defaultList],
                statusChecked: [...defaultList]
            }
        },
        methods: {
            filter() {
                this.$emit("statusFilter", this.statusChecked)
            }
        },
        props: {
            isVisible: Boolean
        }
    }
</script>

<style scoped>
    .dropdown-menu {
        display: block;
        border-radius: unset;
        min-width: unset;
    }
    .dropdown-item.active, .dropdown-item:active {
        background-color: unset;
        color: unset;
    }
</style>
