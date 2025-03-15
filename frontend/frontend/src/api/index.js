import axios from 'axios';
import { mockTeam, mockCandidate, mockCompatibilityData, mockSummary } from '../mockData';

// Flag to toggle between mock data and real API calls
const USE_MOCK_DATA = true;

// Create API client with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
});

// Get team information
export const getTeam = async (teamId = 1) => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockTeam), 500);
    });
  }
  
  try {
    const response = await api.get(`/team/${teamId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team:', error);
    throw error;
  }
};

// Get all teams (for team selection)
export const getAllTeams = async () => {
  if (USE_MOCK_DATA) {
    // Create multiple mock teams for selection
    return new Promise(resolve => {
      setTimeout(() => resolve([
        mockTeam,
        {
          id: 2,
          name: "Marketing",
          department: "Marketing",
          members: [
            { id: 3, name: "Sarah Wilson", role: "Marketing Manager" },
            { id: 4, name: "Mike Johnson", role: "Content Strategist" },
          ]
        },
        {
          id: 3,
          name: "Customer Support",
          department: "Operations",
          members: [
            { id: 5, name: "Emma Davis", role: "Support Lead" },
            { id: 6, name: "James Miller", role: "Support Specialist" },
          ]
        }
      ]), 500);
    });
  }
  
  try {
    const response = await api.get('/teams');
    return response.data;
  } catch (error) {
    console.error('Error fetching all teams:', error);
    throw error;
  }
};

// Get candidate information
export const getCandidate = async (candidateId = 1) => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockCandidate), 500);
    });
  }
  
  try {
    const response = await api.get(`/candidate/${candidateId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching candidate:', error);
    throw error;
  }
};

// Get all candidates (for candidate selection)
export const getAllCandidates = async () => {
  if (USE_MOCK_DATA) {
    // Create multiple mock candidates for selection
    return new Promise(resolve => {
      setTimeout(() => resolve([
        mockCandidate,
        {
          id: 2,
          name: "Sam Thompson",
          position: "Backend Developer",
          email: "sam.t@example.com",
          skills: ["Python", "FastAPI", "Database Design"]
        },
        {
          id: 3,
          name: "Jamie Wilson",
          position: "Full Stack Developer",
          email: "jamie.w@example.com",
          skills: ["JavaScript", "Node.js", "MongoDB", "React"]
        }
      ]), 500);
    });
  }
  
  try {
    const response = await api.get('/candidates');
    return response.data;
  } catch (error) {
    console.error('Error fetching all candidates:', error);
    throw error;
  }
};

// Get compatibility score between team and candidate
export const getCompatibilityScore = async (teamId = 1, candidateId = 1) => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockCompatibilityData), 500);
    });
  }
  
  try {
    const response = await api.get(`/compatibility/${candidateId}/${teamId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching compatibility score:', error);
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
    const response = await api.get(`/compatibility/${candidateId}/${teamId}/summary`);
    return response.data;
  } catch (error) {
    console.error('Error fetching compatibility summary:', error);
    throw error;
  }
};