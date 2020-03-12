<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
    import "../templates/fa.css";
    import "bootstrap/dist/css/bootstrap.min.css";
    import "./assets/style.css";

    export default {
        name: "App",
        created() {
            window.document.title = window.data.pageTitle;
        }
    }
</script>

<style scoped>

</style>
