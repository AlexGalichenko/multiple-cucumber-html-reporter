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
                                    <th>
                                        <a class="pointer first-column" role="button" @click="toggleSort('nameComparator')">
                                            <span>Feature</span>
                                            <i :class="sortIcon('nameComparator')" title="sort"/>
                                        </a>
                                    </th>
                                    <th><i class="fa fa-tags fa-lg" title="Tags"/></th>
                                    <th>Status</th>
                                    <th class="text-center">Platform</th>
                                    <th>Device</th>
                                    <th>OS</th>
                                    <th v-if="suite.app > 0">App</th>
                                    <th v-if="suite.browser > 0">Browser</th>
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
                                <tr v-for="feature in filterFeatures(sortedFeatures)" role="row">
                                    <td class="first-column">
                                        <router-link :to="{name: 'feature', params: {
                                                fid: feature.id,
                                                feature: feature
                                            }
                                        }">{{feature.name}}</router-link>
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
                                    <td v-if="suite.displayDuration">{{feature.duration / 1000000000}}s</td>
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
    import * as featureUtils from "../utils/feature";
    import * as sort from "../utils/sort";

    export default {
        name: "FeatureTable",
        data() {
            return {
                filterInput: "",
                length: 50,
                page: 0,
                comparator: "nameComparator",
                order: false
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
            },
            sortComparator() {
                return sort[this.comparator];
            },
            sortedFeatures() {
                const sortedFeatures = this.suite.features.sort(this.sortComparator);
                if (this.order) return sortedFeatures.reverse();
                else return sortedFeatures;
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
            }
        },
        props: {
            suite: Object
        }
    }
</script>

<style scoped>
    .pointer {
        cursor: pointer;
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
