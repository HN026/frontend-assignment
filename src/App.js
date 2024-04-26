import './App.css';
import Navbar from './components/Navbar';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MaxWidthWrapper from './components/Wrapper';
import Metrics from './components/Metrics';
import Logs from './components/Logs';

export const SelectedOptionContext = React.createContext();

function App() {
  const options = [
    { value: 'live', label: 'Live' },
    { value: '5', label: 'Last 5 minutes' },
    { value: '15', label: 'Last 15 minutes' },
    { value: '30', label: 'Last 30 minutes' },
    { value: '60', label: 'Last 1 hour' },
    { value: '180', label: 'Last 3 hours'},
    { value: '360', label: 'Last 6 hours'},
  ];

  const [selectedOption, setSelectedOption] = useState(options.find(option => option.value === 'live'));

  return (
    <Router>
      <SelectedOptionContext.Provider value={{ selectedOption, setSelectedOption }}>
        <MaxWidthWrapper>
          <Navbar options={options} />
          <Routes>
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="*" element={<Navigate to="/metrics" />} />
          </Routes>
        </MaxWidthWrapper>
      </SelectedOptionContext.Provider>
    </Router>
  );
}

export default App;