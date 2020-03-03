<template>
    <div class="col-md-4 col-lg-4 col-xs-12">
        <div class="x_panel fixed_height_360">
            <div class="x_title">
                <h2>Metadata</h2>
                <ul class="nav navbar-right panel_toolbox">
                    <li>
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                    </li>
                </ul>
                <div class="clearfix"></div>
            </div>
            <div class="x_content">
                <div class="dashboard-widget-content">
                    <ul class="quick-list">
                        <li>
                            <span class="meta-data-title">Platform</span>
                            <span class="meta-data-data">
                                <i :class="'fa fa-lg fa-'+ deviceIcon" data-toggle="tooltip" data-placement="top" :title="deviceType">
                                    <span>{{deviceIcon}}</span>
                                </i>
                            </span>
                        </li>
                        <li>
                            <span class="meta-data-title">Device</span>
                            <span class="meta-data-data">{{feature.metadata.device}}</span>
                        </li>
                        <li>
                            <span class="meta-data-title">OS</span>
                            <span class="meta-data-data">
                                <i :class="'fa fa-lg fa-'+ platformName" data-toggle="tooltip" data-placement="top" :title="platformName">
                                    <span>{{platformName}}</span>
                                </i>
                            </span>
                        </li>
                        <li>
                            <span class="meta-data-title">Browser</span>
                            <span class="meta-data-data">
                                <i :class="'fa fa-lg fa-'+ browserIcon" data-toggle="tooltip" data-placement="top" :title="browserIcon">
                                    <span>{{browserIcon}}</span>
                                </i>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import * as featureUtils from "../utils/feature";

    export default {
        name: "Metadata",
        props: {
            feature: Object
        },
        computed: {
            deviceIcon() {
                return featureUtils.deviceIcon(this.feature)
            },
            deviceType() {
                return featureUtils.deviceType(this.feature)
            },
            platformName() {
                return featureUtils.platformName(this.feature)
            },
            app() {
                return featureUtils.app(this.feature)
            },
            browserIcon() {
                return featureUtils.browserIcon(this.feature)
            }
        }
    }
</script>

<style scoped>

</style>
