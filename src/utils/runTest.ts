import { Task } from "@/types/lessons";

export const runTest = (iframe: HTMLIFrameElement, task: Task) => {
    const { test } = task;
    
    const contentWindow = iframe.contentWindow as any;
    const contentDocument = iframe.contentDocument as any;
    if (!contentWindow || !contentDocument) return { success: false, message: "Sandbox error" };

    try {
        if (test.type === 'dom-query') {
            return contentWindow.eval(`
                (function() {
                    const el = document.querySelector('${test.selector}');
                    if (!el) return { success: false, message: 'El ${test.selector} is not found' };

                    const val = window.getComputedStyle(el)['${test.property}'];
                    const normalizedVal = val.replace(/\\s+/g, '').toLowerCase();
                    const expected = '${test.expectedValue}'.replace(/\\s+/g, '').toLowerCase();
                    
                    const isMatch = normalizedVal === expected;

                    return {
                        success: isMatch,
                        message: isMatch ? 'Correct!' : 'Expected ${test.expectedValue}, get ' + val
                    };
                })()
            `);
        } else if(test.type === 'js-function') {
            // return contentWindow.eval(test.code || "");
            const validatorFn = new Function('document', task.test.code || '');
            const result = validatorFn(contentDocument);
            
            return {
                success: !!result,
                message: result ? 'Correct!' : 'Logic test failed'
            };
        }
        
        return { success: false, message: "Unknown type of test" };
    } catch (e) {
        return { success: false, message: "Error: " + e };
    }
};