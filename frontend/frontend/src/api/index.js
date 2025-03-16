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
const USE_MOCK_DATA = false;

// Create API client with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
});

//get all teams
export const getAllTeams = async () => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockTeams), 500);
    });
  }
  
  try {
    // Get the response from the API
    const response = await api.get('/teams');
    console.log('Full API response:', response);
    console.log('Teams raw data:', response.data);
    
    // Check if it's an array
    if (Array.isArray(response.data)) {
      const processedTeams = response.data.map(team => {
        console.log('Processing team:', team);
        // Return a properly formatted team object
        return {
          id: team.id,
          name: team.name,
          department: team.department || 'Not specified',
          description: team.description || '',
          // Make sure members is an array
          members: Array.isArray(team.members) ? team.members : []
        };
      });
      console.log('Processed teams:', processedTeams);
      return processedTeams;
    } 
    
    // If not an array, log the error and return an empty array
    console.error('Expected array from /teams endpoint but got:', typeof response.data);
    return [];
  } catch (error) {
    console.error('Error fetching teams:', error);
    // Fall back to mockTeams to keep the app working
    return mockTeams;
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
    // Updated to use the /candidates endpoint from your backend
    const response = await api.get('/candidates');
    
    // Transform the response to match what frontend expects
    // Backend candidates only have id, name, email - we need to add position and skills
    const candidates = response.data.map(candidate => ({
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      // Add default values for fields not provided by backend
      position: candidate.position || 'Not specified',
      skills: candidate.skills || []
    }));
    
    return candidates;
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
    // This matches your backend /team/{team_id} endpoint
    const response = await api.get(`/team/${teamId}`);
    
    // Transform the response if needed to match frontend expectations
    const team = {
      id: response.data.id,
      name: response.data.name,
      department: response.data.department,
      // Your backend includes description which frontend might not use
      description: response.data.description,
      // Make sure members has the expected structure
      members: response.data.members
    };
    
    return team;
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
    // This matches your backend /candidate/{candidate_id} endpoint
    const response = await api.get(`/candidate/${candidateId}`);
    
    // Transform the response to add missing fields if needed
    const candidate = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      // Add default values for fields not provided by backend
      position: response.data.position || 'Not specified',
      skills: response.data.skills || []
    };
    
    return candidate;
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
    // This matches your backend /compatibility/{candidate_id}/{team_id} endpoint
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
    // Get compatibility data which contains the summary
    const compatibilityData = await getCompatibilityScore(teamId, candidateId);
    
    // Extract the summary from the compatibility data
    if (compatibilityData.summary) {
      return { insights: compatibilityData.summary };
    }
    
    // Fallback value if no summary is provided
    return { insights: "No detailed insights available for this candidate and team combination." };
  } catch (error) {
    console.error(`Error fetching compatibility summary for team ${teamId}, candidate ${candidateId}:`, error);
    throw error;
  }
};