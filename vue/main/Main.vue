<template>
    <div class="main_conainer">
        <div class="row">
            <FeatureOverview :suite="suite"/>
            <ScenarioOverview :suite="suite"/>
        </div>

        <div class="row">
            <FeatureTable :suite="suite"/>
        </div>
    </div>
</template>

<script>
    import FeatureOverview from "./FeatureOverview.vue";
    import ScenarioOverview from "./ScenarioOverview.vue";
    import FeatureTable from "./FeatureTable.vue";

    export default {
        name: "Main",
        data() {
            return {
                suite: null
            }
        },
        computed: {
        },
        created() {
            this.suite = window.data;
            console.log(window.data);
        },
        methods: {
        },
        components: {
            ScenarioOverview,
            FeatureOverview,
            FeatureTable
        }
    }
</script>

<style scoped>

</style>
