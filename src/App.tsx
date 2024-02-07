import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './assets/components/LogInPage/LogInPage';
import { IdProvider } from './assets/components/LogInPage/AuthContext';
import Page from './assets/components/Page';

const App: React.FC = () => {
  
  return (
    <Router>
      <IdProvider>
        <Routes>
          <Route path="/" Component={LoginPage} />
          <Route path="/protected" Component={Page} />
        </Routes>
      </IdProvider>
    </Router>
  );
};

export default App;