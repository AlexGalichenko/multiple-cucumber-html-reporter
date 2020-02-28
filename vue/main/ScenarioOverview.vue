<template>
    <div class="col-md-6 col-lg-6 col-xs-12">
        <div class="x_panel fixed_height_360">
            <div class="x_title">
                <h2>Scenarios</h2>
                <ul class="nav navbar-right panel_toolbox">
                    <li>
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                    </li>
                </ul>
                <div class="clearfix"></div>
            </div>
            <div class="x_content container">
                <table class="chart">
                    <tbody><tr>
                        <th>
                            <p>Chart</p>
                        </th>
                        <th class="row">
                            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                <p class="">Status</p>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <p class="">Progress</p>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <td class="chart">
                            <PieChart
                                    :data="chartData"
                                    :options="options"
                                    :height="200"
                                    :width="200"
                            />
                            <div class="total">{{suite.scenarios.total}}</div>
                        </td>
                        <td>
                            <table class="tile_info">
                                <tbody><tr>
                                    <td>
                                        <p data-toggle="tooltip" data-placement="left" title="Scenario passed">
                                            <i class="fa fa-check-circle passed-color"></i>
                                            Passed
                                        </p>
                                    </td>
                                    <td class="percentage">{{suite.scenarios.passedPercentage}} %</td>
                                </tr>
                                <tr>
                                    <td>
                                        <p data-toggle="tooltip" data-placement="left" title="Scenario failed">
                                            <i class="fa fa-exclamation-circle failed-color"></i>
                                            Failed
                                        </p>
                                    </td>
                                    <td class="percentage">{{suite.scenarios.failedPercentage}} %</td>
                                </tr><tr>
                                    <td>
                                        <p data-toggle="tooltip" data-placement="left" title="Scenario has double step implementation and failed because of that.">
                                            <i class="fa fa-flash ambiguous-color"></i>
                                            Ambiguous
                                        </p>
                                    </td>
                                    <td class="percentage">{{suite.scenarios.ambiguousPercentage}} %</td>
                                </tr>
                                <tr>
                                    <td>
                                        <p data-toggle="tooltip" data-placement="left" title="Scenario has no step implmentation.">
                                            <i class="fa fa-question-circle not-defined-color"></i>
                                            Not defined
                                        </p>
                                    </td>
                                    <td class="percentage">{{suite.scenarios.notdefinedPercentage}} %</td>
                                </tr>
                                <tr>
                                    <td>
                                        <p data-toggle="tooltip" data-placement="left" title="Scenario is pending">
                                            <i class="fa fa-minus-circle pending-color"></i>
                                            Pending
                                        </p>
                                    </td>
                                    <td class="percentage">{{suite.scenarios.pendingPercentage}} %</td>
                                </tr>
                                <tr>
                                    <td>
                                        <p data-toggle="tooltip" data-placement="left" title="Scenario is skipped">
                                            <i class="fa fa-arrow-circle-right skipped-color"></i>
                                            Skipped
                                        </p>
                                    </td>
                                    <td class="percentage">{{suite.scenarios.skippedPercentage}} %</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import PieChart from "../global/PieChart.vue";

    export default {
        name: "ScenarioOverview",
        data() {
            return {
                chartData: {
                    datasets: [{
                        data: [
                            this.suite.scenarios.passed,
                            this.suite.scenarios.failed,
                            this.suite.scenarios.pending,
                            this.suite.scenarios.skipped,
                            this.suite.scenarios.ambiguous,
                            this.suite.scenarios.notdefined,
                        ],
                        borderColor: "black",
                        borderWidth: 0.1,
                        backgroundColor: [
                            "#26B99A",
                            "#E74C3C",
                            "#FFD119",
                            "#3498DB",
                            "#b73122",
                            "#F39C12"
                        ]
                    }],
                    labels: [
                        "Passed",
                        "Failed",
                        "Pending",
                        "Skipped",
                        "Ambiguous",
                        "Not defined"
                    ]
                },
                options: {
                    responsive: true,
                    legend: false
                }
            }
        },
        props: {
            suite: Object
        },
        components: {
            PieChart
        }
    }
</script>

<style scoped>

</style>
