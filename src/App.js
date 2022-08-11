import LoginForm from './Login/LoginForm';
import { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './Home/Home';

export const AppContext = createContext();

function App() {
  const [appState, setAppState] = useState({});

  return (
    <AppContext.Provider value={{appState: appState, setAppState: setAppState}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!appState.id || !appState.password ? <Navigate to="/login" /> : <Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
