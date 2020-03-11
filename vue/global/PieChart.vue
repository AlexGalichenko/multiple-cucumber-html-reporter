<script>
    import { Doughnut } from "vue-chartjs"

    export default {
        name: "PieChart",
        extends: Doughnut,
        props: ["data", "options"],
        mounted () {
            this.renderChart(this.data, this.options)
        }
    }
</script>

<style>
</style>
