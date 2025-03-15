import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Questionnaire from './pages/Questionnaire';
import TeamSelection from './pages/TeamSelection';
import CandidateSelection from './pages/CandidateSelection';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/team-selection" replace />} />
            <Route path="/team-selection" element={<TeamSelection />} />
            <Route path="/candidate-selection/:teamId" element={<CandidateSelection />} />
            <Route path="/dashboard/:teamId/:candidateId" element={<Dashboard />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </ChakraProvider>
  );
}

export default App;