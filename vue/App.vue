<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
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
