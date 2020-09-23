<template>
    <div>
        <i class="fa fa-tag fa-lg"/>
        <span v-for="(tag, index) in tags" :key="'tag' + index">
            {{tag.name}}
        </span>
    </div>
</template>

<script>
    export default {
        name: "ExternalLinks",
        props: {
            tags: Array
        }
    }
</script>

<style scoped>
</style>
