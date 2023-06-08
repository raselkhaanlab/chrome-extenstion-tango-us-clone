
export function isObjectLiteral(variable: any) {
    return Object.prototype.toString.call(variable) === '[object Object]';
}


export function storageGetSync(key: string) {
    return new Promise((resovle) => {
        chrome.storage.local.get(key, (value) => {
            console.log({ value })
            resovle(value);
        });
    });
}
export function storageSetSync(key: string, value: any) {
    return new Promise((resovle) => {
        chrome.storage.local.set({ key: value }, () => {
            console.log("save successfull");
            resovle(true)
        });
    });
}