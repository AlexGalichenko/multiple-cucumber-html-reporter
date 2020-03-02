<template>
    <div>
        <Header/>
        <div class="main_conainer">
            <div class="row">
                <FeatureOverview :suite="suite"/>
                <ScenarioOverview :suite="suite" :width="6"/>
            </div>

            <div class="row">
                <FeatureTable :suite="suite"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../global/Header.vue";
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
        },
        methods: {
        },
        components: {
            ScenarioOverview,
            FeatureOverview,
            FeatureTable,
            Header
        }
    }
</script>

<style scoped>

</style>
