<template>
        <div class="row scenarios">
            <div>
                <div v-for="scenario in feature.elements" class="col-md-12 col-sm-12 col-xs-12">
                    <div class="x_panel">
                        <div class="x_title">
                            <div class="tags"></div>
                            <h2>Scenario: <small>{{scenario.name}}</small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li v-if="scenario.passed > 0">
                                  <span class="step passed-background" data-toggle="tooltip" title=""
                                        data-original-title="Scenario is passed">
                                    {{scenario.passed}}
                                  </span>
                                </li>
                                <li v-if="scenario.failed > 0">
                                  <span class="step failed-background" data-toggle="tooltip" title=""
                                        data-original-title="Scenario is failed">
                                    {{scenario.failed}}
                                  </span>
                                </li>
                                <li v-if="scenario.skipped > 0">
                                  <span class="step skipped-background" data-toggle="tooltip" title=""
                                        data-original-title="Scenario is skipped">
                                    {{scenario.skipped}}
                                  </span>
                                </li>
                                <li v-if="scenario.notdefined > 0">
                                  <span class="step not-defined-background" data-toggle="tooltip" title=""
                                        data-original-title="Scenario is undefined">
                                    {{scenario.notdefined}}
                                  </span>
                                </li>
                                <li v-if="scenario.ambiguous > 0">
                                  <span class="step ambiguous-background" data-toggle="tooltip" title=""
                                        data-original-title="Scenario is ambiguous">
                                    {{scenario.ambiguous}}
                                  </span>
                                </li>
                                <li v-if="scenario.pending > 0">
                                  <span class="step pending-background" data-toggle="tooltip" title=""
                                        data-original-title="Scenario is pending">
                                    {{scenario.pending}}
                                  </span>
                                </li>
                                <li>
                                    <span style="font-size:1.2em"> Duration:</span>
                                    <span style="padding-right:5em">{{scenario.duration / 1000000000}}s</span>
                                </li>
                                <li>
                                    <a class="collapse-link" @click="toggleStepsVisibility(scenario)">
                                        <i class="fa fa-chevron-up"></i>
                                    </a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                        <div v-show="getDisplayed(scenario)" class="x_content">
                            <Step :step="step" v-for="(step, index) in scenario.steps" :key="index"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import Step from "./Step.vue";

    export default {
        name: "Scenarios",
        props: {
            feature: Object
        },
        methods: {
            toggleStepsVisibility(scenario) {
                console.log(scenario.isDisplayed);
                scenario.isDisplayed = !scenario.isDisplayed
            },
            getDisplayed(scenario) {
                return scenario.isDisplayed
            }
        },
        mounted() {
            console.log(this.feature.elements);
        },
        components: {
            Step
        }
    }
</script>

<style scoped>
    .scenarios {
        display: block;
    }
</style>
