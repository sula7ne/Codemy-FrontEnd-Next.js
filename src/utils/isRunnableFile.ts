export const isRunnableFile = (path: string) => {
    const extension = path.includes(".") ? path.split(".").pop() : "";

    if(extension === "html") return true;

    return false;
}