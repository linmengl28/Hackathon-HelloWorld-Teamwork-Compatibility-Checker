// Mock data for frontend development with data matching backend

// Mock team data - matches backend/app/db/team.py
export const mockTeam = {
  id: 1,
  name: "Backend Development Team",
  department: "Software Engineering",
  description: "This team specializes in designing and maintaining scalable backend systems for various applications.",
  members: [
    { id: 1, name: "John Doe", role: "Team Lead" },
    { id: 2, name: "Jane Smith", role: "Senior Backend Developer" },
    { id: 3, name: "Samuel Green", role: "Backend Developer" },
    { id: 4, name: "Emily Brown", role: "DevOps Engineer" },
    { id: 5, name: "David White", role: "Database Administrator" }
  ]
};

// Mock candidate data - matches backend/app/db/candidate.py
// Using the first candidate from candidateDB and adding position and skills fields
export const mockCandidate = {
  id: 1,
  name: "Alice Johnson",
  position: "Frontend Developer", // Added to maintain UI expectations
  email: "alice.johnson@example.com",
  skills: ["JavaScript", "React", "UI Design", "CSS", "TypeScript"] // Maintained from original mockData for UI
};

// Mock compatibility data - matches backend/app/db/compatibility_result.py
export const mockCompatibilityData = {
  candidate_id: 1,
  team_id: 1,
  overall_score: 87.0,
  dimension_scores: {
    work_style: 85,
    communication_style: 72,
    collaboration: 81,
    problem_solving: 76,
    adaptability: 79
  },
  strengths: ["Good cultural fit", "Adaptable work style"],
  challenges: ["May prefer solo work over collaboration"]
};

// Mock compatibility summary - based on compatibility_result.py and maintaining the expected format
export const mockSummary = {
  insights: "Strong alignment with team communication patterns. This candidate shows strong alignment with the team's work style and collaboration preferences. Their structured approach to work matches well with the team's processes. Some differences in communication style may require adjustment, but overall, this candidate appears to be a good fit for the team's dynamics."
};

// Mock questionnaire data - matches backend/app/db/questionnaire.py
export const mockQuestionnaire = {
  title: "Team Match Compatibility Questionnaire",
  description: "This questionnaire assesses how well a candidate matches with a team's working style, adaptability, communication, problem-solving, and collaboration preferences.",
  questions: [
    {
      id: 1,
      text: "How do you prefer to structure your daily work?",
      category: "work_style",
      options: ["Detailed schedule", "Flexible outline", "No structure"]
    },
    {
      id: 2,
      text: "How do you handle last-minute changes?",
      category: "adaptability",
      options: ["Stressful", "Adapt quickly", "Accept and adjust"]
    },
    {
      id: 3,
      text: "How would you describe your communication style?",
      category: "communication",
      options: ["Direct", "Diplomatic", "Reserved"]
    },
    {
      id: 4,
      text: "When facing a problem, what is your typical approach?",
      category: "problem_solving",
      options: ["Break it down", "Brainstorm ideas", "Seek help"]
    },
    {
      id: 5,
      text: "In team projects, what role do you often take?",
      category: "collaboration",
      options: ["Leader", "Supporter", "Idea generator"]
    },
    {
      id: 6,
      text: "How comfortable are you working with ambiguity?",
      category: "adaptability",
      options: ["Very comfortable", "Somewhat", "Not at all"]
    },
    {
      id: 7,
      text: "How often do you share updates with your team?",
      category: "communication",
      options: ["Frequently", "When needed", "Rarely"]
    },
    {
      id: 8,
      text: "What motivates you most in a team setting?",
      category: "collaboration",
      options: ["Recognition", "Impact", "Team spirit"]
    },
    {
      id: 9,
      text: "How do you prioritize tasks?",
      category: "work_style",
      options: ["By deadlines", "By impact", "Intuitively"]
    },
    {
      id: 10,
      text: "What do you do when you're stuck on a task?",
      category: "problem_solving",
      options: ["Troubleshoot alone", "Ask for help", "Take a break"]
    }
  ]
};