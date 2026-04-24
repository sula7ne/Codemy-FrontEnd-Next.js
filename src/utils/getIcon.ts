import cssIcon from "@/assets/images/icons/languages/css.svg"
import htmlIcon from "@/assets/images/icons/languages/html.svg"
import jsIcon from "@/assets/images/icons/languages/js.svg"
import pyIcon from "@/assets/images/icons/languages/py.svg"
import reactIcon from "@/assets/images/icons/languages/react.svg"
import unknownIcon from "@/assets/images/icons/languages/unknown.svg"

export const getIcon = (extension: string) => ({
    js: jsIcon,
    html: htmlIcon,
    css: cssIcon,
    jsx: reactIcon,
    py: pyIcon,
}[extension] || unknownIcon);