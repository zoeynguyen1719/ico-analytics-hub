import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CookieConsent from './components/CookieConsent.tsx'

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <CookieConsent />
  </>
);