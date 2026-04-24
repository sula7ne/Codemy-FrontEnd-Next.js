export const isMac = () => {
    if ("userAgentData" in navigator) {
        const uaData = navigator.userAgentData as { platform?: string };
        if (uaData.platform) return uaData.platform === "macOS";
    }

    return navigator.platform.toUpperCase().includes("MAC");
    
    // return navigator.userAgentData?.platform === "macOS" || navigator.platform.toUpperCase().includes("MAC");
}
