import { FileTreeNode } from "@/types/lessons";
import { findFile } from "./findFile";

const resolveCssPath = (href: string, htmlPath: string): string | null => {
    if (/^(https?:|data:|blob:|#)/i.test(href)) return null;

    const htmlDir = htmlPath.split("/").slice(0, -1).join("/") || "";
    const rawPath = href.startsWith("/")
        ? href
        : `${htmlDir}/${href}`;

    const parts = rawPath.split("/");
    const normalizedParts: string[] = [];

    for (const part of parts) {
        if (!part || part === ".") continue;
        if (part === "..") {
            normalizedParts.pop();
            continue;
        }
        normalizedParts.push(part);
    }

    return `/${normalizedParts.join("/")}`;
};

export const bundleHtmlWithCss = (htmlCode: string, fileTree: FileTreeNode[], htmlPath = "/index.html"): string => {
    const linkRegex = /<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>|<link[^>]*href=["']([^"']+)["'][^>]*rel=["']stylesheet["'][^>]*>/gi;

    return htmlCode.replace(linkRegex, (match, href1, href2) => {
        const cssFileName = href1 || href2;
        if (!cssFileName) return match;

        const cssPath = resolveCssPath(cssFileName, htmlPath);
        if (!cssPath) return match;

        const cssFile = findFile(fileTree, cssPath);

        if (cssFile && cssFile.type === 'FILE') {
            return `<style data-from="${cssFileName}">\n${cssFile.code || ""}\n</style>`;
        }

        return match;
    });
};
