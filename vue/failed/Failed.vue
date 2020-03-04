<template>
    <div>
        <Header/>
        <div class="main_conainer">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>
                            Failed Overview {{this.failed.length}}
                        </h2>
                        <h2 class="copy">
                            <a role="button" class="pointer">
                                <i class="fa fa-copy"/>
                            </a>
                        </h2>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content">
                        <div class="table-responsive">
                            <div id="features-table_wrapper" class="container-fluid dataTables_wrapper dt-bootstrap no-footer">
                                <div class="row">
                                    <table id="features-table" class="table table-striped table-bordered dt-responsive nowrap dataTable no-footer">
                                        <thead>
                                            <tr>
                                                <th>Feature</th>
                                                <th>Scenario</th>
                                                <th>Tags</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="scenario in failed">
                                                <td>
                                                    <router-link :to="{
                                                        name: 'feature',
                                                        params: {
                                                            fid: scenario.fid
                                                        }
                                                    }"
                                                    :href="`${origin}${baseUrl}#feature/${scenario.fid}`"
                                                    class="feature-link">{{scenario.featureName}}
                                                    </router-link>
                                                </td>
                                                <td>
                                                    <router-link :to="{
                                                        name: 'scenario',
                                                        params: {
                                                            fid: scenario.fid,
                                                            sid: scenario.id
                                                        }
                                                    }"
                                                    :href="`${origin}${baseUrl}#feature/${scenario.fid}/scenario/${scenario.id}`"
                                                    class="feature-link">{{scenario.name}}
                                                    </router-link>
                                                </td>
                                                <td>{{scenario.tags.map(t => t.name).join()}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
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
    import Header from "../global/Header.vue";
    export default {
        name: "Failed",
        data() {
            return {
                failed: null,
                baseUrl: null,
                origin: null
            }
        },
        created() {
            this.baseUrl = window.location.pathname;
            this.origin = window.location.origin;
            this.failed = window.data.features
                .filter(f => f.scenarios.failed > 0)
                .reduce((failed, feature) => {
                    const failedScenarios = feature.elements
                        .filter(scenario => scenario.failed > 0)
                        .map(scenario => {
                            scenario.featureName = feature.name;
                            scenario.fid = feature.id;
                            return scenario
                        });
                    return failed.concat(failedScenarios)
                }, []);
        },
        components: {
            Header
        }
    }
</script>

<style scoped>
    .copy {
        margin-left: auto;
        float: right;
        margin-right: 5px;
    }
    span, i, th, td {
        color: #5A738E;
    }
    .feature-link {
        color: #337ab7
    }
</style>
