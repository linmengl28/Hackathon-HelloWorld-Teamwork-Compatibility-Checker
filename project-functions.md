# Teamwork Compatibility Checker - Project Structure & Functions

## Database Schema

### Table: teams
| Column      | Type      | Constraints          |
|-------------|-----------|----------------------|
| id          | INTEGER   | PRIMARY KEY          |
| name        | VARCHAR   | NOT NULL             |
| department  | VARCHAR   | NOT NULL             |
| created_at  | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### Table: team_members
| Column      | Type      | Constraints          |
|-------------|-----------|----------------------|
| id          | INTEGER   | PRIMARY KEY          |
| team_id     | INTEGER   | FOREIGN KEY (teams.id) |
| name        | VARCHAR   | NOT NULL             |
| role        | VARCHAR   | NOT NULL             |
| joined_date | TIMESTAMP | NOT NULL             |
| created_at  | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### Table: work_preferences
| Column                   | Type    | Constraints          |
|--------------------------|---------|----------------------|
| id                       | INTEGER | PRIMARY KEY          |
| member_id                | INTEGER | FOREIGN KEY (team_members.id) |
| work_style_score         | INTEGER | NOT NULL             |
| communication_style_score| INTEGER | NOT NULL             |
| collaboration_score      | INTEGER | NOT NULL             |
| strength_tags            | JSON    | NULL                 |
| updated_at               | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### Table: candidates
| Column          | Type      | Constraints          |
|-----------------|-----------|----------------------|
| id              | INTEGER   | PRIMARY KEY          |
| name            | VARCHAR   | NOT NULL             |
| email           | VARCHAR   | UNIQUE, NOT NULL     |
| position        | VARCHAR   | NOT NULL             |
| application_date| TIMESTAMP | NOT NULL             |
| created_at      | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### Table: questions
| Column          | Type      | Constraints          |
|-----------------|-----------|----------------------|
| id              | INTEGER   | PRIMARY KEY          |
| text            | VARCHAR   | NOT NULL             |
| category        | VARCHAR   | NOT NULL             |
| response_options| JSON      | NOT NULL             |
| weight          | FLOAT     | DEFAULT 1.0          |

### Table: responses
| Column          | Type      | Constraints          |
|-----------------|-----------|----------------------|
| id              | INTEGER   | PRIMARY KEY          |
| question_id     | INTEGER   | FOREIGN KEY (questions.id) |
| respondent_id   | INTEGER   | NOT NULL             |
| respondent_type | VARCHAR   | NOT NULL             |
| value           | VARCHAR   | NOT NULL             |
| submitted_at    | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### Table: compatibility_results
| Column          | Type      | Constraints          |
|-----------------|-----------|----------------------|
| id              | INTEGER   | PRIMARY KEY          |
| candidate_id    | INTEGER   | FOREIGN KEY (candidates.id) |
| team_id         | INTEGER   | FOREIGN KEY (teams.id) |
| overall_score   | FLOAT     | NOT NULL             |
| dimension_scores| JSON      | NOT NULL             |
| strengths       | JSON      | NULL                 |
| challenges      | JSON      | NULL                 |
| insights        | TEXT      | NULL                 |
| generated_at    | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

## Backend Structure & Functions

### 1. FastAPI App Entry Point
**File: `backend/app/main.py`**
- Initialize FastAPI application
- Configure CORS
- Include API routers
- Health check endpoint

### 2. Database Models & ORM
**File: `backend/app/models/team.py`**
- `Team` model definition
- Relationships to team members and compatibility results

**File: `backend/app/models/team_member.py`**
- `TeamMember` model definition
- Relationship to work preferences and teams

**File: `backend/app/models/candidate.py`**
- `Candidate` model definition
- Relationship to responses and compatibility results

**File: `backend/app/models/question.py`**
- `Question` model definition
- Category and response options

**File: `backend/app/models/response.py`**
- `Response` model for storing answers
- Polymorphic relationship to team members or candidates

**File: `backend/app/models/compatibility.py`**
- `CompatibilityResult` model
- Store scores, strengths, challenges, and AI insights

### 3. API Endpoints

**File: `backend/app/api/endpoints/teams.py`**
Functions:
- `create_team()`: Create a new team
- `get_teams()`: Get list of all teams
- `get_team()`: Get team details by ID
- `add_team_member()`: Add a member to a team
- `get_team_members()`: Get all members of a team

**File: `backend/app/api/endpoints/candidates.py`**
Functions:
- `create_candidate()`: Create a new candidate
- `get_candidates()`: Get list of all candidates
- `get_candidate()`: Get candidate details by ID
- `add_candidate_responses()`: Add questionnaire responses for a candidate

**File: `backend/app/api/endpoints/questions.py`**
Functions:
- `create_question()`: Create a new question
- `get_questions()`: Get all questions, optionally filtered by category
- `update_question()`: Update an existing question

**File: `backend/app/api/endpoints/compatibility.py`**
Functions:
- `calculate_compatibility()`: Generate compatibility analysis between team and candidate
- `get_compatibility_result()`: Get a specific compatibility result
- `get_team_compatibility_results()`: Get all compatibility results for a team

### 4. Business Logic Services

**File: `backend/app/services/team_service.py`**
Functions:
- `create_team_with_members()`: Create a team with initial members
- `calculate_team_profile()`: Generate aggregate team profile
- `add_member_with_preferences()`: Add team member with work preferences

**File: `backend/app/services/candidate_service.py`**
Functions:
- `create_candidate_with_responses()`: Create a candidate with questionnaire responses
- `process_candidate_responses()`: Process raw responses into a candidate profile

**File: `backend/app/services/compatibility_service.py`**
Functions:
- `calculate_compatibility()`: Main function to calculate compatibility scores
- `calculate_dimension_score()`: Calculate score for a specific dimension
- `identify_strengths_and_challenges()`: Identify key strengths and challenges
- `generate_compatibility_insights()`: Generate AI-powered insights

### 5. AI Components

**File: `backend/app/ai/openai_client.py`**
Functions:
- `get_openai_client()`: Initialize and configure OpenAI client
- `generate_text()`: Generate text using OpenAI API

**File: `backend/app/ai/nlp_processor.py`**
Functions:
- `extract_personality_traits()`: Extract personality traits from text responses
- `analyze_communication_style()`: Analyze communication preferences
- `process_text_responses()`: Process text responses into structured data

**File: `backend/app/ai/compatibility_analyzer.py`**
Functions:
- `calculate_team_profile()`: Generate team profile from member data
- `calculate_candidate_profile()`: Generate candidate profile from responses
- `calculate_compatibility()`: Compare profiles and generate compatibility scores
- `generate_insights()`: Generate natural language insights about compatibility

## Frontend Structure & Functions

### 1. API Clients

**File: `frontend/src/api/teamApi.js`**
Functions:
- `getTeams()`: Fetch all teams
- `getTeam(id)`: Fetch team by ID
- `createTeam(data)`: Create a new team
- `addTeamMember(teamId, data)`: Add member to team

**File: `frontend/src/api/candidateApi.js`**
Functions:
- `getCandidates()`: Fetch all candidates
- `getCandidate(id)`: Fetch candidate by ID
- `createCandidate(data)`: Create a new candidate
- `submitCandidateResponses(id, data)`: Submit questionnaire responses

**File: `frontend/src/api/compatibilityApi.js`**
Functions:
- `calculateCompatibility(teamId, candidateId)`: Request compatibility calculation
- `getCompatibilityResult(id)`: Fetch a compatibility result
- `getTeamCompatibilityResults(teamId)`: Fetch all results for a team

### 2. React Components

**File: `frontend/src/components/forms/QuestionnaireForm.js`**
Functions:
- `handleChange(questionId, value)`: Update response value
- `validateForm()`: Validate all responses are provided
- `handleSubmit()`: Submit questionnaire data

**File: `frontend/src/components/forms/TeamForm.js`**
Functions:
- `handleInputChange(field, value)`: Update team field
- `addTeamMember()`: Add a new team member to the form
- `handleSubmit()`: Submit team data

**File: `frontend/src/components/dashboard/CompatibilityChart.js`**
Functions:
- `renderRadarChart()`: Render radar chart of compatibility dimensions
- `renderStrengthsAndChallenges()`: Display strengths and challenges
- `renderAIInsights()`: Display AI-generated insights

**File: `frontend/src/components/dashboard/TeamInsights.js`**
Functions:
- `renderTeamProfile()`: Display team profile visualization
- `renderTopCandidates()`: Display top compatible candidates
- `renderTeamComposition()`: Visualize team composition

### 3. Page Components

**File: `frontend/src/pages/Dashboard.js`**
Functions:
- `fetchTeamsData()`: Load teams data
- `fetchCandidatesData()`: Load candidates data
- `handleTeamSelect(teamId)`: Change selected team
- `renderTeamOverview()`: Render team overview section
- `renderCandidateList()`: Render candidate list section

**File: `frontend/src/pages/TeamSetup.js`**
Functions:
- `handleCreateTeam()`: Handle team creation
- `handleAddMembers()`: Handle adding members
- `handleTeamQuestionnaire()`: Handle team questionnaire

**File: `frontend/src/pages/CandidateEntry.js`**
Functions:
- `handleCreateCandidate()`: Handle candidate creation
- `handleCandidateQuestionnaire()`: Handle candidate questionnaire
- `handleTeamSelection()`: Handle team selection for comparison

**File: `frontend/src/pages/Results.js`**
Functions:
- `fetchCompatibilityResult()`: Fetch compatibility result data
- `renderCompatibilityChart()`: Render compatibility visualization
- `renderCompatibilityDetails()`: Render detailed compatibility information

### 4. Custom Hooks

**File: `frontend/src/hooks/useCompatibility.js`**
Functions:
- `calculateCompatibility(teamId, candidateId)`: Calculate compatibility
- `getCompatibilityResult(resultId)`: Get result data
- `getTeamCompatibility(teamId)`: Get team compatibility data

**File: `frontend/src/hooks/useForm.js`**
Functions:
- `handleChange(field, value)`: Handle form field changes
- `setFormValues(values)`: Set multiple form values
- `validateForm()`: Validate form fields
- `resetForm()`: Reset form to initial state

**File: `frontend/src/hooks/useApi.js`**
Functions:
- `get(url)`: Make GET request
- `post(url, data)`: Make POST request
- `put(url, data)`: Make PUT request
- `delete(url)`: Make DELETE request

## Key Integration Points

1. **Team Member Questionnaire → Team Profile**
   - Team members answer questionnaire
   - Responses stored in database
   - AI processes responses into a team profile

2. **Candidate Questionnaire → Candidate Profile**
   - Candidate answers same questionnaire
   - Responses stored in database
   - AI processes responses into a candidate profile

3. **Compatibility Calculation**
   - Team profile and candidate profile compared
   - Dimension scores calculated
   - Strengths and challenges identified
   - AI generates natural language insights

4. **Results Visualization**
   - Compatibility scores displayed in radar chart
   - Strengths and challenges listed
   - AI insights presented in dashboard
