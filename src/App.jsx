import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <AppRoutes />
      <Toaster position="top-right" richColors closeButton />
    </Router>
  );
}

export default App;
