import React, { useEffect, useState } from "react";
import './popup.css'
import { storageGetSync, storageSetSync } from "../utils/helper";


const Popup = () => {
    const [start, setStart] = useState(false);
    const [createdTabId, setCreatedTabId] = useState<number | undefined>();
    const [windowInfo, setWindowInfo] = useState<chrome.windows.Window>(null);

    useEffect(() => {
        chrome.windows.getCurrent(window => setWindowInfo(window));
        chrome.storage.local.get("key", function (result) {
            console.log("key")
            const value = result.key;
            setStart(value);
        });
    }, []);

    async function toggle() {
        const { state, height, width, id, top, left } = windowInfo;
        try {
            if (!start) {
                await chrome.windows.update(id, {
                    state: "normal",
                    width: width - 300,
                    left: 300,
                    top: top
                });
                setStart(true);
            } else {
                await chrome.windows.update(id, {
                    width,
                    left,
                    top,
                    state,
                    height
                });
                setStart(false);
            }

            const data = { key: start };

            // Store the data in the local storage area
            chrome.storage.local.set(data, function () {
                console.log("Data stored successfully");
            });
            // setStart((prev) => !prev);

        } catch (e) {
            console.log(e);
        }

    }

    return (
        <>
            <div style={{ display: "flex", height: "100vh", width: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <button style={{ padding: "4px 30px", borderRadius: "4px", fontSize: "20px", background: "rgba(0,0,0, 0.8)", color: "white", border: "1px solid rgba(0,0,0, 1)" }} onClick={toggle}>
                    {start ? "stop" : "start"}
                </button>
            </div>
        </>
    )
};



export default Popup;