import axios from 'axios';
import { mockTeam, mockCandidate, mockCompatibilityData, mockSummary } from '../mockData';

// Additional mock data - all teams and candidates
const mockTeams = [
  mockTeam,
  { id: 2, name: 'Marketing Team', department: 'Marketing', members: [/* member data */] },
  { id: 3, name: 'Support Team', department: 'Support', members: [/* member data */] }
];

const mockCandidates = [
  mockCandidate,
  { id: 2, name: 'Jane Smith', position: 'UX Designer', email: 'jane@example.com', skills: ['UI Design', 'Figma', 'User Research'] },
  { id: 3, name: 'Alex Johnson', position: 'Product Manager', email: 'alex@example.com', skills: ['Product Strategy', 'Agile', 'Data Analysis'] }
];

// Flag to toggle between mock data and real API calls
const USE_MOCK_DATA = true;

// Create API client with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
});

// Get all teams
export const getAllTeams = async () => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockTeams), 500);
    });
  }
  
  try {
    // Assuming you have a known range of team IDs 1-3
    const teamIds = [1, 2, 3];
    const promises = teamIds.map(id => api.get(`/team/${id}`).then(res => res.data));
    const teams = await Promise.all(promises.map(p => p.catch(e => null)));
    return teams.filter(team => team !== null);
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

// Get all candidates
export const getAllCandidates = async () => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockCandidates), 500);
    });
  }
  
  try {
    // Assuming you have a known range of candidate IDs 1-3
    const candidateIds = [1, 2, 3];
    const promises = candidateIds.map(id => api.get(`/candidate/${id}`).then(res => res.data));
    const candidates = await Promise.all(promises.map(p => p.catch(e => null)));
    return candidates.filter(candidate => candidate !== null);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw error;
  }
};

// Get team information by ID
export const getTeam = async (teamId = 1) => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      const team = mockTeams.find(t => t.id === teamId) || mockTeam;
      setTimeout(() => resolve(team), 500);
    });
  }
  
  try {
    const response = await api.get(`/team/${teamId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching team ${teamId}:`, error);
    throw error;
  }
};

// Get candidate information by ID
export const getCandidate = async (candidateId = 1) => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      const candidate = mockCandidates.find(c => c.id === candidateId) || mockCandidate;
      setTimeout(() => resolve(candidate), 500);
    });
  }
  
  try {
    const response = await api.get(`/candidate/${candidateId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching candidate ${candidateId}:`, error);
    throw error;
  }
};

// Get compatibility score between team and candidate
export const getCompatibilityScore = async (teamId = 1, candidateId = 1) => {
  if (USE_MOCK_DATA) {
    // Return slightly different compatibility data based on the combination
    return new Promise(resolve => {
      const scoreMod = ((teamId * 7) + (candidateId * 5)) % 15;
      const modifiedData = {
        ...mockCompatibilityData,
        overall_score: Math.min(95, Math.max(45, mockCompatibilityData.overall_score + scoreMod - 7))
      };
      
      // Modify dimension scores
      Object.keys(modifiedData.dimension_scores).forEach(key => {
        modifiedData.dimension_scores[key] = Math.min(
          95, 
          Math.max(40, modifiedData.dimension_scores[key] + scoreMod - 7)
        );
      });
      
      setTimeout(() => resolve(modifiedData), 500);
    });
  }
  
  try {
    const response = await api.get(`/compatibility/${candidateId}/${teamId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching compatibility score for team ${teamId}, candidate ${candidateId}:`, error);
    throw error;
  }
};

// Get AI summary of compatibility
export const getCompatibilitySummary = async (teamId = 1, candidateId = 1) => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockSummary), 500);
    });
  }
  
  try {
    // Try to extract summary from compatibility data
    const compatibilityData = await getCompatibilityScore(teamId, candidateId);
    if (compatibilityData.summary) {
      return { insights: compatibilityData.summary };
    }
    
    // If no summary in compatibility data, try dedicated summary endpoint
    const response = await api.get(`/compatibility/${candidateId}/${teamId}/summary`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching compatibility summary for team ${teamId}, candidate ${candidateId}:`, error);
    throw error;
  }
};