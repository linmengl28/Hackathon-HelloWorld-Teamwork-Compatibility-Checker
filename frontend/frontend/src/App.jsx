import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import CandidateQuestionnaire from './pages/CandidateQuestionnaire';
import TeamSelection from './pages/TeamSelection';
import CandidateSelection from './pages/CandidateSelection';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {/* Selection flow */}
          <Route
            path="/"
            element={
              <MainLayout>
                <TeamSelection />
              </MainLayout>
            }
          />
          
          <Route
            path="/candidate-selection/:teamId"
            element={
              <MainLayout>
                <CandidateSelection />
              </MainLayout>
            }
          />
          
          {/* Dashboard with team and candidate parameters */}
          <Route
            path="/dashboard/:teamId/:candidateId"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          
          {/* Legacy dashboard route (for backward compatibility) */}
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          
          {/* Standalone questionnaire pages */}
          <Route path="/questionnaire" element={<CandidateQuestionnaire />} />

          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;