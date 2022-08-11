import LoginForm from './Login/LoginForm';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './Home/Home';

export const AppContext = createContext();

function App() {
  const [appState, setAppState] = useState(JSON.parse(localStorage.getItem("bsv.appState") || "{}"));

  useEffect(() => {
    localStorage.setItem("bsv.appState", JSON.stringify(appState));
  }, [appState]);

  return (
    <AppContext.Provider value={{appState: appState, setAppState: setAppState}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!appState.id || !appState.password ? <Navigate to="/login" /> : <Home />} />
          <Route path="login" element={appState.id || appState.password ? <Navigate to="/" /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
