<template>
    <div>
        <Header/>
        <router-view/>
    </div>
</template>

<script>
    import Header from "./global/Header.vue";
    import Main from "./main/Main.vue";

    import "./assets/style.css";

    export default {
        name: "App",
        components: {
            Header,
            Main
        }
    }
</script>

<style scoped>

</style>
