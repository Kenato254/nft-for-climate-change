import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Mint from "./pages/Mint";
import AllMinted from "./pages/Allminted";
import App from './pages/App';
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";

export default function ClimateApp() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<AllMinted />} />
          <Route path="upload" element={<App />} />
          <Route path="mint" element={<Mint />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClimateApp />
  </React.StrictMode>
);

// reportWebVitals();

