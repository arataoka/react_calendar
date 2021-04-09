import React from 'react';
import './App.scss';
import { Auth } from './features/auth/Auth';

const App: React.FC = () => {
  return (
    <div className="App">
      <Auth />
    </div>
  );
};

export default App;
