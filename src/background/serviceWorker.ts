// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//     console.log(msg);
//     console.log(sender);
//     sendResponse("Front the background Script");
// })

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    if (message.action === 'captureTab') {
        chrome.tabs.captureVisibleTab({ format: 'png' }, function (dataUrl) {
            // Process the captured screenshot
            console.log('Screenshot captured:', dataUrl);
            fetch(dataUrl).then(res => res.blob()).then(blob => {
                const objectURL = URL.createObjectURL(blob);
                chrome.downloads.download({
                    url: objectURL,
                    filename: 'screenshot.png'
                });
                URL.revokeObjectURL(objectURL);
            });
            // You can do further processing or save the screenshot as needed

            // Send the screenshot back to the content script if needed
            sendResponse({ screenshot: dataUrl });
        });
    }

    // Return true to indicate that the response will be sent asynchronously
    return true;
});