<template>
    <div class="page-container">
        <md-app md-mode="fixed">
            <md-app-toolbar class="md-primary">
                <span class="md-title">@cucumber-e2e/reporter</span>
            </md-app-toolbar>
            <md-app-content>
                <ScenarioCard
                    v-for="scenario in feature.elements"
                    :scenario="scenario"
                    :key="scenario.id"
                    :fid="feature.id"
                />
            </md-app-content>
            <div>Footer</div>
        </md-app>
    </div>
</template>

<script>
    import ScenarioCard from "./ScenarioCard.vue";

    export default {
        name: "Feature",
        props: {
            fid: String
        },
        data() {
            return {
                feature: window.data.find(feature => feature.id === this.fid)
            }
        },
        components: {
            ScenarioCard
        }
    }
</script>

<style scoped>

</style>
