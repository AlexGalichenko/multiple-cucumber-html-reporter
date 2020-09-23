<script>
    import { Bar } from "vue-chartjs"

    export default {
        name: "BarChart",
        extends: Bar,
        props: ["data", "options"],
        mounted () {
            this.renderChart(this.data, this.options)
        }
    }
</script>

<style>
</style>
