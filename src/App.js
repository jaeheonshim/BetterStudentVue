import LoginForm from './Login/LoginForm';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Footer from './Footer';
import Schedule from './pages/Schedule';
import Header from './Header';
import Barcode from './pages/Barcode';
import Disclaimer from './pages/Disclaimer';
import { OnlineStatusProvider } from './util/OnlineStatusProvider';
import About from './pages/About';
import TOS from './pages/TOS';
import TOSModal from './components/TOSModal';

import ReactGA from "react-ga";

const TRACKING_ID = "UA-112388647-8";
ReactGA.initialize(TRACKING_ID);

export const AppContext = createContext();
export const DebugContext = createContext();

function App() {
  const [appState, setAppState] = useState(JSON.parse(localStorage.getItem("bsv.appState") || "{}"));
  const [debugState, setDebugState] = useState({
    debug: false
  });

  useEffect(() => {
    localStorage.setItem("bsv.appState", JSON.stringify(appState));
  }, [appState]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <OnlineStatusProvider>
      <DebugContext.Provider value={{debugState: debugState, setDebugState: setDebugState}} >
        <AppContext.Provider value={{appState: appState, setAppState: setAppState}}>
          <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
            <TOSModal />
            <Routes>
              <Route path="/login" element={appState.id || appState.password ? <Navigate to="/" /> : <Login />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/tos" element={<TOS />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/barcode" element={<Barcode />} />
              <Route path="/about" element={<About />} />
              <Route path="/" element={!appState.id || !appState.password ? <Navigate to="/login" /> : <Home />} />
            </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      </DebugContext.Provider>
    </OnlineStatusProvider>
  );
}

export default App;
