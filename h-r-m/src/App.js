import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './components/dasbord';
import Attendance from './components/attendance';
import EmployeeDirectory from './components/EmployeeDirectory';
import LevelComponent from './components/LevelComponent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="employee-directory" element={<EmployeeDirectory />} />
          <Route path="leave-management" element={<LevelComponent />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
