import { data } from "autoprefixer";
import { isObjectLiteral } from "../utils/helper";


function validateMessage(message: any) {
    if (isObjectLiteral(message) && message["from"] && message["message"]) {
        return true;
    }
    throw new Error(" invalid message format");

}



const mouseEnterFn = (e) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    target.style.outline = "1px solid yellow";
}
const mouseLeaveFn = (e) => {
    const target = e.target as HTMLElement;
    target.style.outline = "none";
}
(() => {
    const elements: (HTMLDivElement | HTMLButtonElement | HTMLAnchorElement)[] = [];
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (validateMessage(message)) {
            if (message["from"] == "popup" && message["message"] && message["message"] && message["message"]["start"]) {
                const divs = document.getElementsByTagName("div");
                const buttons = document.getElementsByTagName("button");
                const anchors = document.getElementsByTagName("a");

                elements.push(...divs);

                elements.forEach((element: HTMLElement) => {
                    element.addEventListener("mouseenter", mouseEnterFn);
                    element.addEventListener("mouseleave", mouseLeaveFn);
                    element.addEventListener("click", (e) => {
                        chrome.runtime.sendMessage({ action: 'captureTab' }, function (response) {
                            if (response && response.screenshot) {
                                console.log(response);
                                // Process the screenshot received from the background script

                                // You can do further processing or display the screenshot as needed
                            }
                        });
                        // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        //     // Capture the visible tab
                        //     chrome.tabs.captureVisibleTab({ format: 'png' }, function (dataUrl) {
                        //         // Process the captured screenshot
                        //         console.log(dataUrl);
                        //         fetch(dataUrl).then(res => res.blob()).then(blob => {
                        //             const objectURL = URL.createObjectURL(blob);
                        //             const a = document.createElement("a");
                        //             a.href = objectURL;
                        //             a.download = "true";
                        //             a.click();
                        //             URL.revokeObjectURL(objectURL);
                        //         })
                        //         // You can do further processing or save the screenshot as needed
                        //     });
                        // });
                    })
                });

            } else if (message["from"] == "popup" && message["message"] && message["message"] && !message["message"]["start"]) {
                elements.forEach(element => {
                    element.removeEventListener("mouseenter", mouseEnterFn);
                    element.removeEventListener("mouseleave", mouseLeaveFn);
                })
            }

            // if (message["from"] == "popup" && message["message"] && message["message"] && message["message"]["start"]) {
            //     document.addEventListener("mousemove", (e) => {
            //         e.stopPropagation();
            //         const target = e.target as HTMLElement;
            //         const targetTag = target && target.tagName ? target.tagName : "";
            //         target.style.outline = 
            //     })
            // }
        }
    });
})()


