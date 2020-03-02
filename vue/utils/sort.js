export function durationComparator(feature1, feature2) {
    return feature1.duration - feature2.duration
}

export function nameComparator(feature1, feature2) {
    return feature1.name > feature2.name ? 1 : -1
}

export function totalComparator(feature1, feature2) {
    return feature1.scenarios.total - feature2.scenarios.total
}

export function passedComparator(feature1, feature2) {
    return feature1.scenarios.passed - feature2.scenarios.passed
}

export function failedComparator(feature1, feature2) {
    return feature1.scenarios.failed - feature2.scenarios.failed
}

export function skippedComparator(feature1, feature2) {
    return feature1.scenarios.skipped - feature2.scenarios.skipped
}

export function pendingComparator(feature1, feature2) {
    return feature1.scenarios.pending - feature2.scenarios.pending
}

export function undefinedComparator(feature1, feature2) {
    return feature1.scenarios.notdefined - feature2.scenarios.notdefined
}

export function ambiguousComparator(feature1, feature2) {
    return feature1.scenarios.ambiguous - feature2.scenarios.ambiguous
}
