
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0] && typeof args[0] === "string" && args[0].includes("Encountered two children with the same key")) {
        const msg = args[0].replace("%s", args[1]);
        fetch("/api/log-duplicate-key", { method: "POST", body: msg });
        console.warn("DUPLICATE_KEY_LOG:", msg);
      }
      originalError(...args);
    };
  import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
