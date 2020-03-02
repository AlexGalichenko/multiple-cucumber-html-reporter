<template>
    <div>
        <Header/>
        <div class="main_conainer">
            <Scenarios :feature="feature"/>
        </div>
    </div>
</template>

<script>
    import Header from "../global/Header.vue";
    import Scenarios from "./Scenarios.vue";

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
            Scenarios
        }
    }
</script>

<style scoped>

</style>
