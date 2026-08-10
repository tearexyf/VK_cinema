import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./store/store";
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import ".//styles/global/_global.scss";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
    </BrowserRouter>
  </StrictMode>,
)

