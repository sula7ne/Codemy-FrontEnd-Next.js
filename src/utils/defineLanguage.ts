export const defineLanguage = (extension: string) => ({
    js: "javascript",
    html: "html",
    css: "css",
    jsx: "javascript",
    py: "python"
}[extension] || "plaintext");