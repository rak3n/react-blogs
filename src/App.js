import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ForgetPasswordForm from './component/ForgetPasswordForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/forgot-password" element={<ForgetPasswordForm />} />
        {/* Other routes/components */}
        <Route path="*" element={<Navigate to="/forgot-password" />} />
      </Routes>
    </Router>
  );
};

export default App;