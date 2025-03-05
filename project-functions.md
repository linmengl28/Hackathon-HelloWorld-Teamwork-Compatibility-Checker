# Backend Functions

## Core Files

### `backend/app/main.py`
- `create_app()`: Creates and configures the FastAPI application
- `setup_routes()`: Registers API routes
- `setup_middleware()`: Configures CORS and other middleware
- Root endpoint for API health check

### `backend/app/core/config.py`
- `get_settings()`: Returns application settings from environment variables
- Class containing all configuration variables and their default values

### `backend/app/core/security.py`
- `create_access_token()`: Creates JWT tokens for authentication
- `verify_token()`: Verifies JWT tokens
- `get_password_hash()`: Hashes passwords
- `verify_password()`: Verifies password hashes
- Authentication dependency for protected endpoints

## API Endpoints

### `backend/app/api/api_v1/endpoints/candidates.py`
- `get_candidates()`: Retrieve list of candidates
- `get_candidate()`: Retrieve a specific candidate by ID
- `create_candidate()`: Create a new candidate
- `update_candidate()`: Update a candidate's information
- `delete_candidate()`: Delete a candidate

### `backend/app/api/api_v1/endpoints/teams.py`
- `get_teams()`: Retrieve list of teams
- `get_team()`: Retrieve a specific team by ID
- `create_team()`: Create a new team
- `update_team()`: Update a team's information
- `delete_team()`: Delete a team
- `add_team_member()`: Add a member to a team
- `remove_team_member()`: Remove a member from a team

### `backend/app/api/api_v1/endpoints/questionnaires.py`
- `get_questionnaires()`: Retrieve list of questionnaires
- `get_questionnaire()`: Retrieve a specific questionnaire
- `create_questionnaire()`: Create a new questionnaire
- `update_questionnaire()`: Update a questionnaire
- `delete_questionnaire()`: Delete a questionnaire
- `submit_questionnaire_response()`: Submit responses to a questionnaire

### `backend/app/api/api_v1/endpoints/compatibility.py`
- `calculate_compatibility()`: Calculate compatibility between a candidate and team
- `get_team_compatibility_report()`: Generate detailed compatibility report
- `get_top_compatible_candidates()`: Get ranked list of candidates by compatibility
- `get_compatibility_visualization_data()`: Get data formatted for visualizations

## Database Models

### `backend/app/models/candidate.py`
- `Candidate` class: SQLAlchemy ORM model for candidates
- Relationships to questionnaire responses

### `backend/app/models/team.py`
- `Team` class: SQLAlchemy ORM model for teams
- `TeamMember` class: Association model for team memberships
- Relationships to team members and questionnaire responses

### `backend/app/models/questionnaire.py`
- `Questionnaire` class: SQLAlchemy ORM model for questionnaire templates
- `Question` class: Model for individual questions
- `QuestionResponse` class: Model for responses to questions
- `ResponseSet` class: Model grouping responses for a submission

### `backend/app/models/compatibility.py`
- `CompatibilityScore` class: Model storing compatibility analysis results
- `CompatibilityDimension` class: Model for different compatibility dimensions
- Relationships to candidates and teams

## AI Services

### `backend/app/services/ai/nlp_processor.py`
- `process_text_response()`: Process text responses using NLP
- `extract_keywords()`: Extract keywords from responses
- `analyze_sentiment()`: Analyze sentiment in responses
- `calculate_semantic_similarity()`: Calculate similarity between responses

### `backend/app/services/ai/compatibility_analyzer.py`
- `calculate_overall_compatibility()`: Calculate overall compatibility score
- `analyze_work_style_compatibility()`: Analyze work style dimension
- `analyze_communication_compatibility()`: Analyze communication dimension
- `analyze_environment_compatibility()`: Analyze work environment compatibility
- `generate_compatibility_insights()`: Generate natural language insights

### `backend/app/services/ai/personality_analyzer.py`
- `analyze_personality_traits()`: Analyze personality traits from responses
- `predict_mbti_type()`: Predict MBTI personality type
- `extract_work_preferences()`: Extract work preferences from personality
- `identify_strengths_weaknesses()`: Identify potential strengths and challenges

### `backend/app/services/ai/visualization_generator.py`
- `generate_radar_chart_data()`: Generate data for radar charts
- `generate_heatmap_data()`: Generate data for compatibility heatmaps
- `generate_bar_chart_data()`: Generate data for bar charts
- `format_data_for_power_bi()`: Format data for Power BI visualization
- `format_data_for_google_charts()`: Format data for Google Charts

## Service Layer

### `backend/app/services/candidate_service.py`
- `get_all_candidates()`: Get all candidates
- `get_candidate_by_id()`: Get candidate by ID
- `create_new_candidate()`: Create a new candidate
- `update_candidate_info()`: Update candidate information
- `delete_candidate_by_id()`: Delete a candidate

### `backend/app/services/team_service.py`
- `get_all_teams()`: Get all teams
- `get_team_by_id()`: Get team by ID
- `create_new_team()`: Create a new team
- `update_team_info()`: Update team information
- `delete_team_by_id()`: Delete a team
- `get_team_members()`: Get members of a team
- `add_member_to_team()`: Add a member to a team
- `remove_member_from_team()`: Remove a member from a team

### `backend/app/services/questionnaire_service.py`
- `get_all_questionnaires()`: Get all questionnaires
- `get_questionnaire_by_id()`: Get questionnaire by ID
- `create_new_questionnaire()`: Create a new questionnaire
- `update_questionnaire()`: Update a questionnaire
- `delete_questionnaire()`: Delete a questionnaire
- `submit_responses()`: Submit responses to a questionnaire
- `get_responses_by_user()`: Get a user's responses to questionnaires

# Frontend Functions

## API Clients

### `frontend/src/api/apiClient.js`
- `request()`: Base API request function
- `get()`, `post()`, `put()`, `delete()`: HTTP method wrappers
- `handleResponse()`: Response handler with error processing
- `setAuthToken()`: Set authentication token for requests

### `frontend/src/api/candidateApi.js`
- `getCandidates()`: Fetch all candidates
- `getCandidate()`: Fetch a specific candidate
- `createCandidate()`: Create a new candidate
- `updateCandidate()`: Update a candidate
- `deleteCandidate()`: Delete a candidate
- `submitCandidateQuestionnaire()`: Submit questionnaire for a candidate

### `frontend/src/api/teamApi.js`
- `getTeams()`: Fetch all teams
- `getTeam()`: Fetch a specific team
- `createTeam()`: Create a new team
- `updateTeam()`: Update a team
- `deleteTeam()`: Delete a team
- `getTeamMembers()`: Get members of a team
- `addTeamMember()`: Add a member to a team
- `removeTeamMember()`: Remove a member from a team

### `frontend/src/api/compatibilityApi.js`
- `getCompatibilityScore()`: Get compatibility score between candidate and team
- `getCompatibilityReport()`: Get detailed compatibility report
- `getTopCandidates()`: Get top candidates sorted by compatibility
- `getVisualizationData()`: Get data for compatibility visualizations

## Context Providers

### `frontend/src/context/AuthContext.jsx`
- `AuthProvider` component: Provides authentication context
- `useAuth()` hook: Custom hook for accessing auth context
- `login()`, `logout()`, `register()`: Authentication functions
- Authentication state management

### `frontend/src/context/AppContext.jsx`
- `AppProvider` component: Provides application-wide state
- `useAppContext()` hook: Custom hook for accessing app context
- Application theme and preferences management

## Custom Hooks

### `frontend/src/hooks/useAuth.js`
- `useAuth()`: Hook for authentication functionality
- `login()`, `logout()`, `register()`: Auth methods
- `isAuthenticated()`: Check authentication status
- `getUser()`: Get current user information

### `frontend/src/hooks/useQuestionnaire.js`
- `useQuestionnaire()`: Hook for questionnaire functionality
- `getQuestions()`: Get questionnaire questions
- `submitResponses()`: Submit questionnaire responses
- `validateResponses()`: Validate responses before submission

### `frontend/src/hooks/useCompatibility.js`
- `useCompatibility()`: Hook for compatibility analysis
- `calculateCompatibility()`: Calculate compatibility between entities
- `getCompatibilityInsights()`: Get AI-generated compatibility insights
- `getVisualizationData()`: Get data formatted for visualizations

## Page Components

### `frontend/src/pages/DashboardPage.jsx`
- `DashboardPage` component: Main dashboard view
- `useEffect()` hooks for data fetching
- State management for dashboard data
- Layout and rendering of dashboard components

### `frontend/src/pages/CandidateForm.jsx`
- `CandidateForm` component: Form for candidate data
- Form state management
- `handleSubmit()`: Form submission handler
- Validation and error handling

### `frontend/src/pages/TeamSetupPage.jsx`
- `TeamSetupPage` component: Team setup interface
- Team creation and editing functionality
- Team member management
- `saveTeam()`: Save team configuration

### `frontend/src/pages/CompatibilityResultsPage.jsx`
- `CompatibilityResultsPage` component: Results display
- `useEffect()` for loading compatibility data
- Rendering of charts and compatibility insights
- Filtering and sorting functionality for results

## Dashboard Components

### `frontend/src/components/dashboard/CompatibilityChart.jsx`
- `CompatibilityChart` component: Visualization component
- Chart creation and rendering
- Data transformation for visualization
- Interaction handlers for charts

### `frontend/src/components/dashboard/CandidateCard.jsx`
- `CandidateCard` component: Display candidate information
- Compatibility score visualization
- `expandDetails()`: Show/hide detailed information
- Action handlers for candidate management

### `frontend/src/components/dashboard/TeamInsights.jsx`
- `TeamInsights` component: Team insights display
- Visualization of team characteristics
- `renderInsightItem()`: Render individual insights
- Filtering of insights by category

### `frontend/src/components/dashboard/AIRecommendations.jsx`
- `AIRecommendations` component: Display AI recommendations
- Rendering of AI-generated insights
- `prioritizeRecommendations()`: Sort recommendations by importance
- UI for recommendation actions
