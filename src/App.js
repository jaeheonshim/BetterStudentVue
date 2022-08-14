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

export const AppContext = createContext();

function App() {
  const [appState, setAppState] = useState(JSON.parse(localStorage.getItem("bsv.appState") || "{}"));

  useEffect(() => {
    localStorage.setItem("bsv.appState", JSON.stringify(appState));
  }, [appState]);

  return (
    <AppContext.Provider value={{appState: appState, setAppState: setAppState}}>
      <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
        <Routes>
          <Route path="/login" element={appState.id || appState.password ? <Navigate to="/" /> : <Login />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/barcode" element={<Barcode />} />
          <Route path="/" element={!appState.id || !appState.password ? <Navigate to="/login" /> : <Home />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
