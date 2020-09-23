<template>
    <div class="page-title x_title">
        <div v-if="feature.tags && feature.tags.length > 0" class="tags">
            <Tags :tags="feature.tags"/>
            <ExternalLinks :externalLinks="feature.externalLinks"/>
        </div>
        <div class="feature-name">
            <span>Feature: {{feature.name}}</span>
        </div>
        <div class="feature-description">
            <p>{{feature.description}}</p>
        </div>
    </div>
</template>

<script>
    import ExternalLinks from "../global/ExternalLinks.vue";
    import Tags from "../global/Tags.vue";

    export default {
        name: "Title",
        props: {
            feature: Object
        },
        components: {
            ExternalLinks,
            Tags
        }
    }
</script>

<style scoped>
.feature-name span {
    font-size: 28px;
}
</style>
