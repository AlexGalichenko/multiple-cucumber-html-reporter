<template>
    <div class="scenario-step-container">
        <div class="label" data-toggle="tooltip" data-placement="top" :title="'Step is ' + step.result.status">
            <i :class="'fa fa-2x fa-' + statusIcon"></i>
        </div>
        <div class="text">
            <span class="keyword highlight">{{step.keyword}}</span>
            <span>{{step.name}}</span>
            <span class="duration">{{step.result.duration / 1000000000}}s</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Step",
        props: {
            step: Object
        },
        computed: {
            statusIcon() {
                if (this.step.result.status === "failed") return "exclamation-circle failed-color";
                if (this.step.result.status === "skipped") return "arrow-circle-right skipped-color";
                if (this.step.result.status === "ambiguous") return "flash ambiguous-color";
                if (this.step.result.status === "undefined") return "question-circle not-defined-color";
                if (this.step.result.status === "pending") return "minus-circle pending-color";
                return "check-circle passed-color";
            }
        }
    }
</script>

<style scoped>

</style>
