import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const CompatibilityChart = ({ compatibilityData }) => {
  if (!compatibilityData) {
    return <Box p={5} borderWidth="1px" borderRadius="lg">Loading compatibility data...</Box>;
  }

  // Extract dimension scores
  const { dimension_scores } = compatibilityData;
  
  const data = {
    labels: ['Work Style', 'Communication', 'Collaboration', 'Problem Solving', 'Adaptability'],
    datasets: [
      {
        label: 'Compatibility Score',
        data: [
          dimension_scores.work_style,
          dimension_scores.communication_style,
          dimension_scores.collaboration,
          dimension_scores.problem_solving || 70, // Default values if not provided
          dimension_scores.adaptability || 65,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };
  
  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Box p={5} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
      <Heading size="md" mb={4}>Compatibility Analysis</Heading>
      
      <Box height="300px">
        <Radar data={data} options={options} />
      </Box>
    </Box>
  );
};

export default CompatibilityChart;