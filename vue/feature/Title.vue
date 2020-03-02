<template>
    <div class="page-title">
        <div v-if="feature.tags && feature.tags.length > 0" class="tags">
            <i class="fa fa-tag fa-lg"></i>
            <span>{{feature.tags.map(f => f.name).join()}}</span>
        </div>
        <h2>Feature:
            <small>{{feature.name}}</small>
        </h2>
        <p>{{feature.description}}</p>
    </div>
</template>

<script>
    export default {
        name: "Title",
        props: {
            feature: Object
        }
    }
</script>

<style scoped>

</style>
