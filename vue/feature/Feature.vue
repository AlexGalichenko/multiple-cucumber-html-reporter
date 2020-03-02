<template>
    <div>
        <Header/>
        <div class="main_conainer">
            <div class="row scenarios">
                <Scenario v-for="(scenario, index) in feature.elements" :scenario="scenario" :key="index"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../global/Header.vue";
    import Scenario from "./Scenario.vue";

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
            Scenario
        }
    }
</script>

<style scoped>
    .scenarios {
        display: block;
    }
</style>
