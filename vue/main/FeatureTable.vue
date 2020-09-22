<template>
    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
            <div class="x_title">
                <h2>Features Overview</h2>
                <ul class="nav navbar-right panel_toolbox">
                    <li>
                        <a class="collapse-link" @click="isVisible = !isVisible">
                            <i :class="`fa fa-chevron-${isVisible ? 'up' : 'down'}`"/>
                        </a>
                    </li>
                </ul>
                <div class="clearfix"></div>
            </div>
            <div v-show="isVisible" class="x_content">
                <div class="table-responsive">
                    <div id="features-table_wrapper" class="container-fluid dataTables_wrapper dt-bootstrap no-footer">
                        <div class="row" id="search-bar">
                            <div class="col-sm-6">
                                <div class="dataTables_length" id="features-table_length">
                                    <div>
                                        <label>Show:</label>
                                        <select @change="page = 0" v-model="length" name="features-table_length" class="form-control">
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="150">150</option>
                                            <option :value="filterFeatures.length">All</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6" id="search">
                                <div id="features-table_filter" class="dataTables_filter input-group">
                                        <input
                                        v-model="filterInput"
                                        @input="page = 0"
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
                                    <th>
                                        <a class="pointer first-column" role="button" @click="toggleSort('nameComparator')">
                                            <span>Feature</span>
                                            <i :class="sortIcon('nameComparator')" title="sort"/>
                                        </a>
                                    </th>
                                    <th class="text-center"><i class="fa fa-tags fa-lg text-center" title="Tags"/></th>
                                    <th @mouseenter="statusFilter = !statusFilter" @mouseleave="statusFilter = !statusFilter" class="pointer text-center">
                                        <a role="button" class="pointer">
                                            <span>Status</span>
                                            <i class="fa fa-filter"/>
                                        </a>
                                        <StatusFilter :isVisible="statusFilter" @statusFilter="setStatuses"/>
                                    </th>
                                    <th class="text-center">Platform</th>
                                    <th>Device</th>
                                    <th class="text-center">OS</th>
                                    <th v-if="suite.app > 0">App</th>
                                    <th class="text-center" v-if="suite.browser > 0">Browser</th>
                                    <th class="pointer" v-if="suite.displayDuration > 0">
                                        <a class="pointer" role="button" @click="toggleSort('durationComparator')">
                                            <span>Duration</span>
                                            <i :class="sortIcon('durationComparator')" title="sort"/>
                                        </a>
                                    </th>
                                    <th>
                                        <a class="pointer" role="button" @click="toggleSort('totalComparator')">
                                            <span>Total</span>
                                            <i :class="sortIcon('totalComparator')" title="sort"/>
                                        </a>
                                    </th>
                                    <th>
                                        <a class="pointer" role="button" @click="toggleSort('passedComparator')">
                                            <span>Passed</span>
                                            <i :class="sortIcon('passedComparator')" title="sort"/>
                                        </a>
                                    </th>
                                    <th>
                                        <a class="pointer" role="button" @click="toggleSort('failedComparator')">
                                            <span>Failed</span>
                                            <i :class="sortIcon('failedComparator')" title="sort"/>
                                        </a>
                                    </th>
                                    <th v-if="suite.scenarios.pending > 0">
                                        <a class="pointer" role="button" @click="toggleSort('pendingComparator')">
                                            <span>Pending</span>
                                            <i :class="sortIcon('pendingComparator')" title="sort"/>
                                        </a>
                                    </th>
                                    <th v-if="suite.scenarios.skipped > 0">
                                        <a class="pointer" role="button" @click="toggleSort('skippedComparator')">
                                            <span>Skipped</span>
                                            <i :class="sortIcon('skippedComparator')" title="sort"/>
                                        </a>
                                    </th>
                                    <th v-if="suite.scenarios.notdefined > 0">
                                        <a class="pointer" role="button" @click="toggleSort('undefinedComparator')">
                                            <span>Undefined</span>
                                            <i :class="sortIcon('undefinedComparator')" title="sort"/>
                                        </a>
                                    </th>
                                    <th v-if="suite.scenarios.ambiguous > 0">
                                        <a class="pointer" role="button" @click="toggleSort('ambiguousComparator')">
                                            <span>Ambiguous</span>
                                            <i :class="sortIcon('ambiguousComparator')" title="sort"/>
                                        </a>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(feature, index) in paginatedFeatures" role="row" :key="index">
                                    <td class="first-column">
                                        <router-link :to="{name: 'feature', params: {
                                                fid: feature.id
                                            }
                                        }" class="feature-link">{{feature.name}}</router-link>
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
                                        <i v-if="deviceIcon(feature)" :class="'fa fa-lg fa-'+ deviceIcon(feature)" data-toggle="tooltip" data-placement="top" :title="deviceType(feature)">
                                            <span>{{deviceIcon(feature)}}</span>
                                        </i>
                                    </td>
                                    <td>{{feature.metadata.device}}</td>
                                    <td class="text-center">
                                        <i v-if="platformName(feature)" :class="'fa fa-lg fa-'+ platformName(feature)" data-toggle="tooltip" data-placement="top" :title="platformName(feature)">
                                            <span>{{platformName(feature)}}</span>
                                        </i>
                                        <span v-if="platformName(feature) && feature.metadata.platform.version">{{feature.metadata.platform.version}}</span>
                                    </td>
                                    <td v-if="suite.app > 0" v-html="app(feature)"/>
                                    <td v-if="suite.browser > 0" class="text-center">
                                        <i v-if="browserIcon(feature)" :class="'fa fa-lg fa-'+ browserIcon(feature)" data-toggle="tooltip" data-placement="top" :title="browserIcon(feature)">
                                            <span>{{browserIcon(feature)}}</span>
                                        </i>
                                        <span v-if="browserIcon(feature) && feature.metadata.browser.version">{{feature.metadata.browser.version}}</span>
                                    </td>
                                    <td v-if="suite.displayDuration">{{feature.time}}</td>
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
                                    Showing {{firstOnPage}} to {{lastOnPage}} of {{filterFeatures.length}} entries
                                </div>
                            </div>
                            <div class="col-sm-7">
                                <div class="dataTables_paginate paging_simple_numbers" id="features-table_paginate">
                                    <ul class="pagination">
                                        <li :class="`page-item previous ${page === 0 ? 'disabled' : ''}`" id="features-table_previous">
                                            <a @click="prev" class="page-link pointer" role="button" aria-controls="features-table" data-dt-idx="0" tabindex="0">Prev</a>
                                        </li>

                                        <li v-for="(p, index) in Array(Math.ceil(filterFeatures.length / length))" :key="index" :class="`page-item ${index === page ? 'active' : ''}`">
                                            <a @click="page = index" role="button" aria-controls="features-table" tabindex="0" class="page-link pointer">{{index + 1}}</a>
                                        </li>

                                        <li :class="`page-item next ${page === Math.ceil(filterFeatures.length / length) - 1 ? 'disabled' : ''}`" id="features-table_next">
                                            <a @click="next" class="page-link pointer" role="button" aria-controls="features-table" data-dt-idx="2" tabindex="0">
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
    import * as featureUtils from "../utils/feature";
    import * as sort from "../utils/sort";
    import { statuses as defaultList } from "../utils/defaults";

    import StatusFilter from "./filter/StatusFilter.vue";

    export default {
        name: "FeatureTable",
        data() {
            return {
                filterInput: "",
                length: 50,
                page: 0,
                comparator: "nameComparator",
                order: false,
                isVisible: true,
                statusFilter: false,
                features: this.suite.features,
                statuses: defaultList
            }
        },
        computed: {
            firstOnPage() {
                return (this.page * this.length) + 1
            },
            lastOnPage() {
                const last = +((this.page * this.length) + this.length);
                return last < this.filterFeatures.length
                    ? last
                    : this.filterFeatures.length
            },
            sortComparator() {
                return sort[this.comparator];
            },
            filterFeatures() {
                const features = this.features
                    .filter(feature => {
                        return feature.name.includes(this.filterInput)
                            && this.statuses.includes(this.status(feature))
                    });
                const sortedFeatures = features.sort(this.sortComparator);
                if (this.order) return sortedFeatures.reverse();
                else return sortedFeatures;
            },
            paginatedFeatures() {
                const first = (this.page * this.length);
                const last = (this.page * this.length) + this.length;
                return this.filterFeatures.slice(first, last);
            }
        },
        methods: {
            statusIcon(feature) {
                return featureUtils.statusIcon(feature)
            },
            status(feature) {
                return featureUtils.status(feature)
            },
            deviceIcon(feature) {
                return featureUtils.deviceIcon(feature)
            },
            deviceType(feature) {
                return featureUtils.deviceType(feature)
            },
            platformName(feature) {
                return featureUtils.platformName(feature)
            },
            app(feature) {
                return featureUtils.app(feature)
            },
            browserIcon(feature) {
                return featureUtils.browserIcon(feature)
            },
            toggleSort(sort) {
                if (this.comparator === sort) {
                    this.order = !this.order;
                } else {
                    this.comparator = sort;
                    this.order = false;
                }
            },
            sortIcon(comparator) {
                const NO_SORT = "fa fa-sort";
                const ASC = "fa fa-sort-amount-asc";
                const DESC = "fa fa-sort-amount-desc";

                if (this.comparator === comparator) {
                    return this.order ? DESC : ASC
                } else {
                    return NO_SORT
                }
            },
            prev() {
                if (this.page > 0) {
                    this.page -= 1
                }
            },
            next() {
                if (this.page < Math.ceil(this.filterFeatures.length / this.length) - 1) {
                    this.page += 1
                }
            },
            setStatuses(statuses) {
                this.page = 0;
                this.statuses = statuses
            }
        },
        props: {
            suite: Object
        },
        components: {
            StatusFilter
        }
    }
</script>

<style scoped>
    .x_content span, .x_content i, .x_content th, .x_content td {
        color: #5A738E;
    }
    .feature-link {
        color: #337ab7
    }
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
    .first-column {
        max-width: 300px;
    }
</style>
