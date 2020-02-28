<template>
    <div class="col-md-6 col-lg-6 col-xs-12">
        <div class="x_panel fixed_height_360">
            <div class="x_title">
                <h2>Features</h2>
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
                        <th>
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
                            <canvas id="feature-chart"></canvas>
                            <div class="total">{{featureCount.total}}</div>
                        </td>
                        <td>
                            <table class="tile_info">
                                <tbody><tr>
                                    <td>
                                        <p data-toggle="tooltip" data-placement="left" title="Features passed">
                                            <i class="fa fa-check-circle passed-color"></i>
                                            Passed
                                        </p>
                                    </td>
                                    <td class="percentage">{{featureCount.passedPercentage}} %</td>
                                </tr>
                                <tr>
                                    <td>
                                        <p data-toggle="tooltip" data-placement="left" title="Features failed">
                                            <i class="fa fa-exclamation-circle failed-color"></i>
                                            Failed
                                        </p>
                                    </td>
                                    <td class="percentage">{{featureCount.failedPercentage}} %</td>
                                </tr>

                                <tr>
                                    <td>
                                        <p data-toggle="tooltip" data-placement="left" title="Features has double step implementation and failed because of that.">
                                            <i class="fa fa-flash ambiguous-color"></i>
                                            Ambiguous
                                        </p>
                                    </td>
                                    <td class="percentage">{{featureCount.ambiguousPercentage}} %</td>
                                </tr>
                                <tr>
                                    <td>
                                        <p data-toggle="tooltip" data-placement="left" title="Features skipped">
                                            <i class="fa fa-arrow-circle-right skipped-color"></i>
                                            Skipped
                                        </p>
                                    </td>
                                    <td class="percentage">{{featureCount.skippedPercentage}} %</td>
                                </tr>
                                </tbody></table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FeatureOverview",
        props: {
            featureCount: Object
        }
    }
</script>

<style scoped>
</style>
