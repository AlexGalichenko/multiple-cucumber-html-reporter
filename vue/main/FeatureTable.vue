<template>
    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
            <div class="x_title">
                <h2>Features overview</h2>
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
                <div class="table-responsive">
                    <div id="features-table_wrapper" class="container-fluid dataTables_wrapper dt-bootstrap no-footer">
                        <div class="row" id="search-bar">
                            <div class="col-sm-6">
                                <div class="dataTables_length" id="features-table_length">
                                    <div>
                                        <label>Show:</label>
                                        <select v-model="length" name="features-table_length" class="form-control">
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="150">150</option>
                                            <option value="-1">All</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6" id="search">
                                <div id="features-table_filter" class="dataTables_filter input-group">
                                        <input v-model="filterInput"
                                        type="text"
                                        class="form-control"
                                        placeholder="Search"
                                        aria-describedby="button-addon2">
                                        <div class="input-group-append">
                                            <button @click="filterInput = ''" class="btn btn-outline-secondary" type="button" id="button-addon2">Clear</button>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <table id="features-table" class="table table-striped table-bordered dt-responsive nowrap dataTable no-footer">
                                <thead>
                                <tr>
                                    <th>Feature name</th>
                                    <th><i class="fa fa-tags fa-lg" title="Tags"></i></th>
                                    <th>Status</th>
                                    <th class="text-center">
                                        <i class="fa fa-desktop fa-lg"></i>
                                        <i class="fa fa-mobile fa-lg"></i>
                                    </th>
                                    <th>Device</th>
                                    <th>OS</th>
                                    <th v-if="suite.app > 0">App</th>
                                    <th v-if="suite.browser > 0">Browser</th>
                                    <th v-if="suite.displayDuration > 0">Duration</th>
                                    <th>Total</th>
                                    <th>Passed</th>
                                    <th>Failed</th>
                                    <th v-if="suite.scenarios.pending > 0">Pending</th>
                                    <th v-if="suite.scenarios.skipped > 0">Skip</th>
                                    <th v-if="suite.scenarios.notdefined > 0">Undefined</th>
                                    <th v-if="suite.scenarios.ambiguous > 0">Ambiguous</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-bind="page" v-for="feature in filterFeatures(suite.features)" role="row">
                                    <td>
                                        <a :href="'#features/' + feature.id">{{feature.name}}</a>
                                    </td>
                                    <td class="text-center">
                                        <i v-if="feature.tags && feature.tags.length > 0" class="fa fa-tag fa-lg" data-toggle="tooltip" data-placement="top" :title="feature.tags.map(tag => tag.name).join()"/>
                                    </td>
                                    <td class="text-center">
                                        <i :class="'fa fa-lg fa-'+ statusIcon(feature)" data-toggle="tooltip" data-placement="top" :title="status(feature)">
                                            <span>{{statusIcon(feature)}}</span>
                                        </i>
                                    </td>
                                    <td class="text-center">
                                        <i :class="'fa fa-lg fa-'+ deviceIcon(feature)" data-toggle="tooltip" data-placement="top" :title="deviceType(feature)">
                                            <span>{{deviceIcon(feature)}}</span>
                                        </i>
                                    </td>
                                    <td>{{feature.metadata.device}}</td>
                                    <td class="text-center">
                                        <i :class="'fa fa-lg fa-'+ platformName(feature)" data-toggle="tooltip" data-placement="top" :title="platformName(feature)">
                                            <span>{{platformName(feature)}}</span>
                                        </i>
                                    </td>
                                    <td v-if="suite.app > 0">
                                        {{app(feature)}}
                                    </td>
                                    <td v-if="suite.browser > 0" class="text-center">
                                        <i :class="'fa fa-lg fa-'+ browserIcon(feature)" data-toggle="tooltip" data-placement="top" :title="browserIcon(feature)">
                                            <span>{{browserIcon(feature)}}</span>
                                        </i>
                                    </td>
                                    <td v-if="suite.displayDuration">{{feature.duration}}</td>
                                    <td>{{feature.scenarios.total}}</td>
                                    <td>{{feature.scenarios.passed}}</td>
                                    <td>{{feature.scenarios.failed}}</td>
                                    <td v-if="suite.scenarios.pending > 0">{{feature.scenarios.pending}}</td>
                                    <td v-if="suite.scenarios.skipped > 0">{{feature.scenarios.skipped}}</td>
                                    <td v-if="suite.scenarios.notdefined > 0">{{feature.scenarios.notdefined}}</td>
                                    <td v-if="suite.scenarios.ambiguous > 0">{{feature.scenarios.ambiguous}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row">
                            <div class="col-sm-5">
                                <div class="dataTables_info" id="features-table_info" role="status" aria-live="polite">
                                    Showing {{firstOnPage}} to {{lastOnPage}} of {{suite.features.length}} entries
                                </div>
                            </div>
                            <div class="col-sm-7">
                                <div class="dataTables_paginate paging_simple_numbers" id="features-table_paginate">
                                    <ul class="pagination">
                                        <li class="page-item previous disabled" id="features-table_previous">
                                            <a class="page-link" role="button" aria-controls="features-table" data-dt-idx="0" tabindex="0">Prev</a>
                                        </li>

                                        <li v-for="(p, index) in Array(Math.floor(suite.features.length / length) + 1)" class="page-item">
                                            <a @click="page = index" role="button" aria-controls="features-table" tabindex="0" class="page-link">{{index + 1}}</a>
                                        </li>

                                        <li class="page-item next disabled" id="features-table_next">
                                            <a role="button" class="page-link" aria-controls="features-table" data-dt-idx="2" tabindex="0">
                                                Next
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const isMobile = (feature) => ["android", "ios"].includes(feature.metadata.platform.name.toLowerCase());
    const isDesktop = (feature) => ["windows", "osx", "linux", "ubuntu"].includes(feature.metadata.platform.name.toLowerCase());

    export default {
        name: "FeatureTable",
        data() {
            return {
                filterInput: "",
                length: 50,
                page: 0
            }
        },
        computed: {
            firstOnPage() {
                return (this.page * this.length) + 1
            },
            lastOnPage() {
                const last = +((this.page * this.length) + this.length);
                return last < this.suite.features.length
                    ? last
                    : this.suite.features.length
            }
        },
        methods: {
            filterFeatures(features) {
                if (this.filterInput) {
                    return features.filter(feature => feature.name.includes(this.filterInput));
                } else {
                    return features.filter((_, index) => index >= this.firstOnPage && index <= this.lastOnPage);
                }
            },
            statusIcon(feature) {
                if (feature.isFailed) return "exclamation-circle failed-color";
                if (feature.isSkipped) return "arrow-circle-right skipped-color";
                if (feature.isAmbiguous) return "flash ambiguous-color";
                return "check-circle passed-color";
            },
            status(feature) {
                if (feature.isFailed) return "Failed";
                if (feature.isSkipped) return "Skipped";
                if (feature.isAmbiguous) return "Ambiguous";
                return "Passed";
            },
            deviceIcon(feature) {
                if (isMobile(feature)) return "mobile";
                if (isDesktop(feature)) return "desktop";
                return "question-circle not-defined-color";
            },
            deviceType(feature) {
                if (isMobile(feature)) return "Mobile / Tablet";
                if (isDesktop(feature)) return "Desktop";
                return "Not known";
            },
            platformName(feature) {
                if (
                    feature.metadata.platform.name.toLowerCase() === "ios" ||
                    feature.metadata.platform.name.toLowerCase() === "osx"
                ) return "apple";
                if (feature.metadata.platform.name.toLowerCase() === "android") return "android";
                if (feature.metadata.platform.name.toLowerCase() === "windows") return "windows";
                if (feature.metadata.platform.name.toLowerCase() === "windows") return "windows";
                if (
                    feature.metadata.platform.name.toLowerCase() === "ubuntu" ||
                    feature.metadata.platform.name.toLowerCase() === "linux"
                ) return "linux";
                return "question-circle not-defined-color";
            },
            app(feature) {
                if (feature.metadata.app) return `${feature.metadata.app.name}<br/>${feature.metadata.app.version}`
            },
            browserIcon(feature) {
                const browserName = feature.metadata.browser.name.toLowerCase();
                if (["firefox", "safari", "chrome"].includes(browserName))
                    return browserName;
                if (["edge", "microsoftedge"].includes(browserName))
                    return "edge";
                if (["internet explorer"].includes(browserName))
                    return "internet explorer";
                return "question-circle not-defined-color";
            }
        },
        props: {
            suite: Object
        }
    }
</script>

<style scoped>
    .table-responsive {
        overflow-x: unset;
    }
    .form-control {
        display: unset;
        width: unset;
        height: unset;
    }
    #search-bar {
        margin-bottom: 10px;
    }
    #features-table_filter {
        height: 19px;
        width: 40%;
    }
    #search {
        display: flex;
        justify-content: flex-end;
    }
</style>
