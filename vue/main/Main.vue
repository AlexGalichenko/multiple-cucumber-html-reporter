<template>
    <div>
        <Header/>
        <div class="main_conainer">
            <div class="row">
                <FeatureOverview :suite="suite" :width="suite.customData ? 4 : 6"/>
                <ScenarioOverview :suite="suite" :width="suite.customData ? 4 : 6"/>
                <Metadata v-if="suite.customData" :suite="suite" :width="4"/>
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
    import Metadata from "./Metadata.vue";

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
            Metadata,
            ScenarioOverview,
            FeatureOverview,
            FeatureTable,
            Header
        }
    }
</script>

<style scoped>

</style>
