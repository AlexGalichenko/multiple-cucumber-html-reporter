<template>
    <div>
        <div v-for="(linkSet, index) in links" :key="'linkSet' + index">
            <i :class="icon(linkSet.type)"/>
            <a v-for="(link, index) in linkSet.links" :key="'link' + index" :href="link.url">
                {{link.name}}
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ExternalLinks",
        props: {
            externalLinks: Array
        },
        methods: {
            icon(type) {
                const base = "fa fa-lg ";
                switch (type) {
                    case "bug": return base + "fa-bug";
                    default: return base + "fa-link";
                }
            }
        },
        computed: {
            links() {
                return this.externalLinks.filter(linkSet => linkSet.links.length > 0)
            }
        }
    }
</script>

<style scoped>
</style>
