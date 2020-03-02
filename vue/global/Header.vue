<template>
    <nav class="navbar">
        <div class="container-fluid" id="nav">
            <p class="navbar-text">Multiple Cucumber HTML Reporter</p>
            <div class="navbar-header">
                <a v-if="isFeature" role="button" class="navbar-brand" @click="$router.go(-1)">
                    <i class="fa fa-arrow-left"><span>Back</span></i>
                </a>
            </div>

        </div>
    </nav>
</template>

<script>
    export default {
        name: "Header",
        computed: {
            isFeature() {
                return this.$router.currentRoute.name === "feature"
            }
        }
    }
</script>

<style scoped>
    #nav {
        justify-content: left;
    }
    .navbar-header {
        margin-left: 10px;
    }
</style>
