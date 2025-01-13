/**
 * Author: Menachem H
 * 
 * @fileoverview Entry point for the React application.
 * 
 * This file sets up the root of the React application and renders it into the DOM.
 * It uses StrictMode for highlighting potential problems in the application.
 * BrowserRouter is used for handling routing within the application.
 * 
 * @module main
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </StrictMode>,
)