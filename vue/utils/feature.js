function isMobile(feature) {
    return ["android", "ios"].includes(feature.metadata.platform && feature.metadata.platform.name.toLowerCase());
}

function isDesktop(feature) {
    return ["windows", "osx", "linux", "ubuntu"].includes(feature.metadata.platform && feature.metadata.platform.name.toLowerCase());
}

export function statusIcon(feature) {
    if (feature.isFailed) return "exclamation-circle failed-color";
    if (feature.isSkipped) return "arrow-circle-right skipped-color";
    if (feature.isAmbiguous) return "flash ambiguous-color";
    return "check-circle passed-color";
}

export function status(feature) {
    if (feature.isFailed) return "Failed";
    if (feature.isSkipped) return "Skipped";
    if (feature.isAmbiguous) return "Ambiguous";
    return "Passed";
}

export function deviceIcon(feature) {
    if (isMobile(feature)) return "mobile";
    if (isDesktop(feature)) return "desktop";
    return false;
}

export function deviceType(feature) {
    if (isMobile(feature)) return "Mobile / Tablet";
    if (isDesktop(feature)) return "Desktop";
    return "Not known";
}

export function platformName(feature) {
    if (feature.metadata.platform) {
        const platform = feature.metadata.platform.name.toLowerCase();
        if (platform === "ios" || platform === "osx") return "apple";
        if (platform === "android") return "android";
        if (platform === "windows") return "windows";
        if (platform === "ubuntu" || platform === "linux") return "linux";
    }
    return false;
}

export function app(feature) {
    if (feature.metadata.app) return `${feature.metadata.app.name}<br/>${feature.metadata.app.version}`
}

export function browserIcon(feature) {
    if (feature.metadata.browser) {
        const browserName = feature.metadata.browser.name.toLowerCase();
        if (["firefox", "safari", "chrome"].includes(browserName))
            return browserName;
        if (["edge", "microsoftedge"].includes(browserName))
            return "edge";
        if (["internet explorer"].includes(browserName))
            return "internet explorer";
    }
    return false;
}
