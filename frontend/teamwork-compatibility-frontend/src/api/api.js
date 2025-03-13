import axios from 'axios';

// Create API client with base URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // Adjust to your backend URL
});

// Get team information
export const getTeam = async () => {
  try {
    const response = await api.get('/teams/1'); // Assuming ID 1 for single team
    return response.data;
  } catch (error) {
    console.error('Error fetching team:', error);
    throw error;
  }
};

// Get candidate information
export const getCandidate = async () => {
  try {
    const response = await api.get('/candidates/1'); // Assuming ID one for single candidate
    return response.data;
  } catch (error) {
    console.error('Error fetching candidate:', error);
    throw error;
  }
};

// Get compatibility score between team and candidate
export const getCompatibilityScore = async () => {
  try {
    const response = await api.get('/compatibility/1'); // Assuming ID 1 for compatibility result
    return response.data;
  } catch (error) {
    console.error('Error fetching compatibility score:', error);
    throw error;
  }
};

// Get AI summary of compatibility
export const getCompatibilitySummary = async () => {
  try {
    const response = await api.get('/compatibility/1/summary');
    return response.data;
  } catch (error) {
    console.error('Error fetching compatibility summary:', error);
    throw error;
  }
};