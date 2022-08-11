import logo from './logo.svg';
import './App.css';
import LoginForm from './login/LoginForm';
import { createContext, useState } from 'react';

export const AppContext = createContext();

function App() {
  const [appState, setAppState] = useState({});

  return (
    <AppContext.Provider value={{appState: appState, setAppState: setAppState}}>
      <div className="container">
        <LoginForm />
      </div>
    </AppContext.Provider>
  );
}

export default App;
