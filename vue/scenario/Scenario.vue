<template>
    <div>{{scenario.name}}</div>
</template>

<script>
    export default {
        name: "Scenario",
        props: {
            fid: String,
            sid: String
        },
        data() {
            return {
                scenario: window
                    .data
                    .find(feature => feature.id === this.fid)
                    .elements
                    .find(scenario => scenario.id === this.sid)
            }
        }
    }
</script>

<style scoped>

</style>
