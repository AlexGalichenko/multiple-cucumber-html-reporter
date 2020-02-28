<template>
    <md-card md-with-hover>
        <md-card-header>
            <div class="md-title" @click="openScenario">{{scenario.name}}</div>
        </md-card-header>
    </md-card>
</template>

<script>
    export default {
        name: "FeatureCard",
        props: {
            fid: String,
            scenario: Object
        },
        methods: {
            openScenario() {
                this.$router.push({
                    path: `/feature/${this.fid}/scenario/${this.scenario.id}`
                })
            }
        },
    }
</script>

<style scoped>

</style>
