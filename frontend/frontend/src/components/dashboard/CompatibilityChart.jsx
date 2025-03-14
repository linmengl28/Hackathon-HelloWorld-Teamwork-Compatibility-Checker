import React, { useState } from 'react';
import { Box, Heading, useColorModeValue, Icon } from '@chakra-ui/react';
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

// Chart icon
const ChartIcon = (props) => (
  <svg 
    stroke="currentColor" 
    fill="none" 
    strokeWidth="2" 
    viewBox="0 0 24 24" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    height="1em" 
    width="1em" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

const CompatibilityChart = ({ compatibilityData }) => {
  // State to track hover state
  const [isHovered, setIsHovered] = useState(false);
  
  // Color mode values
  const titleColor = useColorModeValue('blue.600', 'blue.300');
  const iconColor = useColorModeValue('blue.500', 'blue.300');
  
  if (!compatibilityData) {
    return (
      <Box p={5} h="100%">
        <Heading size="md" mb={4}>Compatibility Analysis</Heading>
        <Box display="flex" alignItems="center" justifyContent="center" h="calc(100% - 60px)">
          Loading compatibility data...
        </Box>
      </Box>
    );
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
        borderWidth: isHovered ? 3 : 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
        pointRadius: isHovered ? 6 : 4,
        pointHoverRadius: 8,
      },
    ],
  };
  
  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          backdropColor: 'transparent',
          color: 'rgba(0, 0, 0, 0.7)',
          font: {
            size: isHovered ? 12 : 10,
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          color: 'rgba(0, 0, 0, 0.7)',
          font: {
            size: isHovered ? 16 : 12,
            weight: isHovered ? 'bold' : 'normal'
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 14,
        },
        padding: 10,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.r !== null) {
              label += context.parsed.r + '%';
            }
            return label;
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <Box p={5} h="100%" position="relative">
      <Heading 
        size="md" 
        mb={4}
        color={titleColor}
        transition="color 0.3s ease"
        display="flex"
        alignItems="center"
      >
        <Icon as={ChartIcon} mr={2} color={iconColor} />
        Compatibility Analysis
      </Heading>
      
      <Box 
        h="calc(100% - 60px)"
        position="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{
            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.4s ease',
            transformOrigin: 'center center'
          }}
        >
          <Radar data={data} options={options} />
        </Box>
      </Box>
    </Box>
  );
};

export default CompatibilityChart;