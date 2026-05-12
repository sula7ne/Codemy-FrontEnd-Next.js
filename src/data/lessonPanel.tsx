// import theoryIcon from "@/assets/images/icons/theory.svg";
// import aiIcon from "@/assets/images/icons/ai.svg";

import { lessonPanel as lessonPanelType } from "@/types/lessonPanel";

export const lessonPanel: lessonPanelType[] = [
    {
        id: "theory",
        label: "theory", // io5 school
        icon: <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 2H9l-.35.15-.65.64-.65-.64L7 2H1.5l-.5.5v10l.5.5h5.29l.86.85h.7l.86-.85h5.29l.5-.5v-10l-.5-.5zm-7 10.32l-.18-.17L7 12H2V3h4.79l.74.74-.03 8.58zM14 12H9l-.35.15-.14.13V3.7l.7-.7H14v9zM6 5H3v1h3V5zm0 4H3v1h3V9zM3 7h3v1H3V7zm10-2h-3v1h3V5zm-3 2h3v1h-3V7zm0 2h3v1h-3V9z"></path></svg>,
    },
    {
        id: "ai-chatbot",
        label: "ai-chatbot", // io5 book
        // у mask добавил fill white
        icon: <svg viewBox="0 0 16 16" fill="currentColor" width="24" height="24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><mask id="SparkleIcon-mask-_r_59_" fill="white"><path clip-rule="evenodd" d="M11.773.762a.5.5 0 01.968 0c.22.841.462 1.358.823 1.74.364.385.896.685 1.803.99a.5.5 0 010 .947c-.906.305-1.44.605-1.803.99-.361.382-.603.898-.823 1.74a.5.5 0 01-.967 0c-.22-.842-.463-1.358-.824-1.74-.363-.385-.896-.685-1.803-.99a.5.5 0 010-.948c.907-.304 1.44-.604 1.803-.988.361-.383.603-.9.823-1.74V.762zM5.368 3.548a.5.5 0 01.967 0c.397 1.522.847 2.516 1.554 3.267.708.752 1.722 1.311 3.354 1.861a.5.5 0 010 .948c-1.632.55-2.646 1.109-3.354 1.861-.707.751-1.157 1.745-1.554 3.267a.5.5 0 01-.967 0c-.397-1.522-.847-2.516-1.553-3.267-.709-.752-1.723-1.312-3.355-1.861a.5.5 0 010-.948c1.632-.55 2.647-1.109 3.355-1.861.706-.751 1.156-1.745 1.553-3.267zm7.9 6.765a.5.5 0 00-.483.37c-.16.6-.332.948-.576 1.2-.246.256-.617.466-1.282.684a.5.5 0 000 .95c.665.218 1.036.428 1.282.684.244.253.416.6.576 1.2a.5.5 0 00.966 0c.16-.6.331-.947.575-1.2.247-.256.617-.466 1.282-.684a.5.5 0 000-.95c-.665-.218-1.035-.428-1.282-.684-.244-.252-.415-.6-.575-1.2a.5.5 0 00-.483-.37z"></path></mask><g mask="url(#SparkleIcon-mask-_r_59_)"><rect width="100%" height="100%" fill="currentColor"></rect></g></svg>
    }
];
