<template>
    <div class="scenario-step-container">
        <div class="label" data-toggle="tooltip" data-placement="top" :title="'Step is ' + step.result.status">
            <i :class="'fa fa-2x fa-' + statusIcon"></i>
        </div>
        <div class="text">
            <span class="keyword highlight">{{step.keyword}}</span>
            <span>{{step.name}}</span>
            <span v-if="step.result.error_message" @click="displayError = !displayError" class="failed-color pointer">
                <i class="fa fa-bug fa-lg"/>
            </span>
            <span v-if="step.image" @click="displayScreenshot = !displayScreenshot" class="pointer">
                <i class="fa fa-image fa-lg"/>
            </span>
            <span v-if="step.text" @click="displayText = !displayText" class="pointer">
                <i class="fa fa-file fa-lg"/>
            </span>
            <span class="duration">{{step.time}}</span>
        </div>
        <div v-if="step.result.error_message" class="attachment error">
            <pre v-show="displayError" class="failed-color">{{step.result.error_message}}</pre>
        </div>
        <div v-if="step.image" class="attachment">
            <img :src="step.image" v-show="displayScreenshot" alt="screenshot" class="screenshot">
        </div>
        <div v-if="step.text" class="attachment">
            <pre v-show="displayText">{{step.text}}</pre>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Step",
        props: {
            step: Object
        },
        data() {
            return {
                displayError: false,
                displayScreenshot: false,
                displayText: false
            }
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
    pre {
        white-space: pre-wrap;       /* css-3 */
        white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
        white-space: -pre-wrap;      /* Opera 4-6 */
        white-space: -o-pre-wrap;    /* Opera 7 */
        word-wrap: break-word;       /* Internet Explorer 5.5+ */
    }
</style>
