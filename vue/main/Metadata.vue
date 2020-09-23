<template>
    <div :class="`col-lg-${width} col-xs-12`">
        <div :class="`x_panel ${isVisible ? 'fixed_height_360' : ''}`">
            <div class="x_title">
                <h2>{{suite.customData.title}}</h2>
                <ul class="nav navbar-right panel_toolbox">
                    <li>
                        <a class="collapse-link" @click="isVisible = !isVisible">
                            <i :class="`fa fa-chevron-${isVisible ? 'up' : 'down'}`"/>
                        </a>
                    </li>
                </ul>
                <div class="clearfix"></div>
            </div>
            <div v-show="isVisible" class="x_content" style="">
                <div class="dashboard-widget-content">
                    <table class="quick-list">
                        <tbody>
                        <tr v-for="(metadata, index) in suite.customData.data" :key="metadata.label + index">
                            <td class="meta-data-title">{{metadata.label}}</td>
                            <td class="meta-data-data">{{metadata.value}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Metadata",
        props: {
            suite: Object,
            width: Number
        },
        data() {
            return {
                isVisible: true
            }
        }
    }
</script>

<style scoped>

</style>
