import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';

const allowedLangs = ["HU", "EN"];

function getDefaultLang() {
  const saved = localStorage.getItem("lang")?.toUpperCase();
  const browser = navigator.language.slice(0, 2).toUpperCase();
  if (saved && allowedLangs.includes(saved)) return saved;
  if (allowedLangs.includes(browser)) return browser;
  return "EN";
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/${getDefaultLang().toLowerCase()}`} replace />} />
        <Route path="/:lang/*" element={<App />} />
        <Route path="*" element={<Navigate to={`/${getDefaultLang().toLowerCase()}`} replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
