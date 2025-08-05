import {StrictMode} from "react";
import {createRoot} from "react-dom/client";

import "./index.scss";

import App from "./App.tsx";

window.fetch = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve(Response.json({
            ok: true,
        }))
    }, 2000);
})

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App/>
    </StrictMode>
);
