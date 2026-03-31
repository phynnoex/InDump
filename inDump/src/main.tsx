import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import ShortCutProvider from "./services/shortCutProvider/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ShortCutProvider>
        <App />
      </ShortCutProvider>
    </Provider>
  </StrictMode>,
);
