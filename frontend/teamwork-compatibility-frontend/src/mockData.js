// src/mockData.js

// Mock team data
export const mockTeam = {
    id: 1,
    name: "Product Development",
    department: "Engineering",
    members: [
      { id: 1, name: "John Doe", role: "Team Lead" },
      { id: 2, name: "Jane Smith", role: "Senior Developer" },
      { id: 3, name: "Michael Chen", role: "UX Designer" },
      { id: 4, name: "Sarah Wilson", role: "Backend Developer" }
    ]
  };
  
  // Mock candidate data
  export const mockCandidate = {
    id: 1,
    name: "Alex Johnson",
    position: "Frontend Developer",
    email: "alex.j@example.com",
    skills: ["JavaScript", "React", "UI Design", "CSS", "TypeScript"]
  };
  
  // Mock compatibility data
  export const mockCompatibilityData = {
    id: 1,
    team_id: 1,
    candidate_id: 1,
    overall_score: 78.5,
    dimension_scores: {
      work_style: 85,
      communication_style: 72,
      collaboration: 81,
      problem_solving: 76,
      adaptability: 79
    },
    strengths: [
      "structured work approach",
      "team collaboration"
    ],
    challenges: [
      "communication style differences"
    ]
  };
  
  // Mock compatibility summary
  export const mockSummary = {
    insights: "This candidate shows strong alignment with the team's work style and collaboration preferences. Their structured approach to work matches well with the team's processes. Some differences in communication style may require adjustment, but overall, this candidate appears to be a good fit for the team's dynamics."
  };