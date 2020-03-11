<template>
    <div>
        <Header/>
        <div class="main_conainer">
            <Title :feature="feature"/>
            <div class="row">
                <ScenarioOverview :suite="feature" :width="8"/>
                <Metadata :feature="feature"/>
            </div>
            <div class="row scenarios">
                <Scenario v-for="(scenario, index) in feature.elements" :scenario="scenario" :fid="fid" :key="index"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../global/Header.vue";
    import Scenario from "./Scenario.vue";
    import ScenarioOverview from "../main/ScenarioOverview.vue";
    import Metadata from "./Metadata.vue";
    import Title from "./Title.vue";

    export default {
        name: "Feature",
        props: {
            fid: String
        },
        data() {
            return {
                feature: null
            }
        },
        created() {
            this.feature = window.data.features.find(f => f.id === this.fid);
        },
        components: {
            Header,
            Scenario,
            ScenarioOverview,
            Metadata,
            Title
        }
    }
</script>

<style scoped>
    .scenarios {
        display: block;
    }
</style>
