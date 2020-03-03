<template>
    <nav class="navbar">
        <div class="container-fluid" id="nav">
            <p class="navbar-text">
                <router-link :to="{name: 'main'}" class="pointer">Multiple Cucumber HTML Reporter</router-link>
            </p>
            <div class="navbar-header">
                <a v-if="displayBackButton" role="button" class="pointer" @click="$router.go(-1)">
                    <i class="fa fa-arrow-left fa-lg"><span>Back</span></i>
                </a>
            </div>

        </div>
    </nav>
</template>

<script>
    export default {
        name: "Header",
        computed: {
            displayBackButton() {
                return this.$router.currentRoute.name === "feature" ||
                       this.$router.currentRoute.name === "scenario"
            }
        }
    }
</script>

<style scoped>
    .navbar-text > a {
        color: inherit;
    }
    #nav {
        justify-content: left;
    }
    .navbar-header {
        margin-left: 10px;
    }
</style>
