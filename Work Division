# Work Division for 5-Person Team

## Person 1: Backend Lead (Database & Core Services)

**Responsibilities:** Database models, schemas, and core business logic services

**Files to Implement:**
- `backend/app/db/base.py`
- `backend/app/db/session.py`
- `backend/app/db/init_db.py`
- `backend/app/models/team.py`
- `backend/app/models/team_member.py`
- `backend/app/models/candidate.py`
- `backend/app/models/question.py`
- `backend/app/models/response.py`
- `backend/app/models/compatibility.py`
- `backend/app/schemas/team.py`
- `backend/app/schemas/candidate.py`
- `backend/app/schemas/question.py`
- `backend/app/schemas/response.py`
- `backend/app/schemas/compatibility.py`
- `backend/app/services/team_service.py`
- `backend/app/services/candidate_service.py`
- `backend/alembic/env.py` (Database migrations setup)

**Key Deliverables:**
1. Complete SQLAlchemy models for all entities
2. Pydantic schemas for data validation
3. Database session management and migrations
4. Core services for team and candidate management

## Person 2: Backend API & AI Integration

**Responsibilities:** API endpoints and compatibility algorithm integration

**Files to Implement:**
- `backend/app/main.py`
- `backend/app/core/config.py`
- `backend/app/api/router.py`
- `backend/app/api/dependencies.py`
- `backend/app/api/endpoints/teams.py`
- `backend/app/api/endpoints/candidates.py`
- `backend/app/api/endpoints/questions.py`
- `backend/app/api/endpoints/compatibility.py`
- `backend/app/services/compatibility_service.py`
- `backend/app/ai/openai_client.py`
- `backend/app/ai/compatibility_analyzer.py`

**Key Deliverables:**
1. Complete API endpoints for all CRUD operations
2. API routing and dependency injection setup
3. OpenAI API integration
4. Compatibility calculation service

## Person 3: Frontend Lead (Architecture & Pages)

**Responsibilities:** React setup, routing, and main page components

**Files to Implement:**
- `frontend/src/App.jsx`
- `frontend/src/main.jsx`
- `frontend/src/api/index.js` (API client setup)
- `frontend/src/api/teamApi.js`
- `frontend/src/api/candidateApi.js`
- `frontend/src/api/compatibilityApi.js`
- `frontend/src/context/TeamContext.jsx`
- `frontend/src/context/CandidateContext.jsx`
- `frontend/src/pages/Dashboard.jsx`
- `frontend/src/pages/TeamSetup.jsx`
- `frontend/src/pages/CandidateEntry.jsx`
- `frontend/src/pages/Results.jsx`
- `frontend/src/components/layout/MainLayout.jsx`
- `frontend/src/components/layout/Header.jsx`
- `frontend/src/components/layout/Sidebar.jsx`

**Key Deliverables:**
1. React application setup with routing
2. API client integration
3. Global state management with Context
4. Main page components and layout

## Person 4: Frontend UI Components

**Responsibilities:** Form components, UI elements, and styling

**Files to Implement:**
- `frontend/src/components/common/Button.jsx`
- `frontend/src/components/common/Card.jsx`
- `frontend/src/components/common/Input.jsx`
- `frontend/src/components/common/Select.jsx`
- `frontend/src/components/forms/QuestionnaireForm.jsx`
- `frontend/src/components/forms/TeamForm.jsx`
- `frontend/src/components/forms/CandidateForm.jsx`
- `frontend/src/utils/validators.js`
- `frontend/src/hooks/useForm.js`
- `frontend/src/index.css` (global styling)
- `frontend/tailwind.config.js` (Tailwind setup)

**Key Deliverables:**
1. Reusable UI components
2. Form components with validation
3. Custom hooks for form handling
4. Global styling and CSS setup

## Person 5: Data Visualization & DevOps

**Responsibilities:** Charts, compatibility visualization, and deployment

**Files to Implement:**
- `frontend/src/components/dashboard/CompatibilityChart.jsx`
- `frontend/src/components/dashboard/TeamInsights.jsx`
- `frontend/src/components/dashboard/CandidateList.jsx`
- `frontend/src/components/dashboard/StrengthsAndChallenges.jsx`
- `frontend/src/utils/charts.js`
- `frontend/src/hooks/useCompatibility.js`
- `docker-compose.yml`
- `backend/Dockerfile`
- `frontend/Dockerfile`
- `nginx/nginx.conf`
- Project README and documentation

**Key Deliverables:**
1. Chart.js visualizations for compatibility data
2. Dashboard components for data display
3. Docker setup for development and production
4. Project documentation and setup instructions

## Shared Responsibilities & Integration Points

### Critical Integration Points:
1. **Database Models ↔ API Endpoints** (Person 1 & Person 2)
2. **API Endpoints ↔ Frontend API Clients** (Person 2 & Person 3)
3. **Frontend Pages ↔ UI Components** (Person 3 & Person 4)
4. **Data Services ↔ Visualizations** (Person 2 & Person 5)
