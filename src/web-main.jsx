/**
 * web-main.jsx — Entry point de la homepage web
 *
 * Monte WebHomePage dans #web-root (défini dans web.html).
 * Importe index.css pour les tokens, la typo, et Tailwind ;
 * le max-width mobile de #root n'est pas appliqué ici car
 * l'élément cible est #web-root (override inline dans web.html).
 */
import { StrictMode }  from 'react'
import { createRoot }  from 'react-dom/client'

import './index.css'
import WebHomePage from './pages/WebHomePage'

createRoot(document.getElementById('web-root')).render(
  <StrictMode>
    <WebHomePage />
  </StrictMode>,
)
