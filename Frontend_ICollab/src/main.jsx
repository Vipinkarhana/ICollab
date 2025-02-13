import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/Store.js";
import { PersistGate } from "redux-persist/integration/react";

// Strict Mode Removed Its Not Prefered (Due to multiple render of posts)
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
)
