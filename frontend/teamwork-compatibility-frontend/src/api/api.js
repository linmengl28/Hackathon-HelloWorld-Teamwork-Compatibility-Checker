// src/api/api.js
import { mockTeam, mockCandidate, mockCompatibilityData, mockSummary } from '../mockData';
import axios from 'axios';
// Flag to toggle between mock data and real API calls
const USE_MOCK_DATA = true;

// Create API client with base URL (will be used when backend is ready)
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
});

// Get team information
export const getTeam = async () => {
  if (USE_MOCK_DATA) {
    // Return mock data with a small delay to simulate network request
    return new Promise(resolve => {
      setTimeout(() => resolve(mockTeam), 500);
    });
  }
  
  try {
    const response = await api.get('/teams/1');
    return response.data;
  } catch (error) {
    console.error('Error fetching team:', error);
    throw error;
  }
};

// Get candidate information
export const getCandidate = async () => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockCandidate), 500);
    });
  }
  
  try {
    const response = await api.get('/candidates/1');
    return response.data;
  } catch (error) {
    console.error('Error fetching candidate:', error);
    throw error;
  }
};

// Get compatibility score between team and candidate
export const getCompatibilityScore = async () => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockCompatibilityData), 500);
    });
  }
  
  try {
    const response = await api.get('/compatibility/1');
    return response.data;
  } catch (error) {
    console.error('Error fetching compatibility score:', error);
    throw error;
  }
};

// Get AI summary of compatibility
export const getCompatibilitySummary = async () => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockSummary), 500);
    });
  }
  
  try {
    const response = await api.get('/compatibility/1/summary');
    return response.data;
  } catch (error) {
    console.error('Error fetching compatibility summary:', error);
    throw error;
  }
};