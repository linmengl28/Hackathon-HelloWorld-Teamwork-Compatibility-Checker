# AI-Powered Teamwork Compatibility Checker
## Table of Contents

1. [Project Overview](#1-project-overview)
2. [How It Works](#2-how-it-works)
3. [Target Users](#3-target-users)
4. [Key Features](#4-key-features)
5. [Implementation](#5-implementation)
6. [Setup](#6-setup)
7. [Usage](#7-usage)
8. [Demo](#8-demo)
9. [Connect](#8-connect)
10. [License](#9-license)

## 1. Project Overview
Hiring the right candidate is not just about technical skills—it’s about ensuring a good teamwork fit. Our AI-powered **Teamwork Compatibility Checker** helps HR teams and hiring managers match candidates with existing teams based on work styles, communication preferences, and cultural fit.

## 2. How It Works
Our system leverages AI to:
- Gather structured data from candidate questionnaires.
- Collect team member data for compatibility comparison.
- Store all data in a structured database.
- Identify top candidates based on compatibility.
- Generate an AI-powered dashboard with insights and visualizations.

## 3. Target Users
- **HR Professionals**: Ensure new hires align with team dynamics.
- **Hiring Managers**: Gain AI-driven insights into candidate-team collaboration potential.
- **Team Leads**: Improve internal hiring decisions based on compatibility analysis.

## 4. Key Features
### 4.1 AI-Powered Data Collection
- **Questionnaire Analysis**: AI processes candidate responses on:
  - Work style (structured vs. flexible)
  - Communication style (direct vs. indirect)
  - Preferred work environment (collaborative vs. independent)
  - Personality traits via AI-based analysis
- **Team Data Collection**: Team members provide their own questionnaire responses for compatibility matching.

### 4.2 AI-Driven Compatibility Matching
- **Natural Language Processing (NLP)**: Extracts personality and work style insights.
- **AI Personality Analysis**: Predicts personality traits and work preferences.
- **Database Storage**: Candidate and team data are stored for structured AI analysis.
- **Automated Matching**: AI ranks candidates based on compatibility with team dynamics.

### 4.3 AI-Powered Candidate Insights & Visualization
- AI analyzes top candidates and generates:
  - Compatibility scores
  - Key strengths and challenges
  - Visual charts summarizing fit across multiple dimensions
  - AI-generated summaries for each candidate
- **Interactive Dashboard** for HR teams:
  - Candidate-to-team compatibility scores
  - Key alignment areas
  - Potential risks & AI recommendations
  - Graphical representations of compatibility

## 5. Implementation
### Hardware
- Machine: Dell Latitude 7455
- Chip: Snadragon X Elite
- OS: Windows 11 Pro
- Memory: 32 GB

### Software
- Python Version: 3.11.0
- AnythingLLM LLM Provider: Qualcomm QNN
- AnythingLLM Chat Model: Llama 3.2 3B Chat 8K

## 6. Setup
### 6.1 Model
- Install and setup AnythingLLM.
  - Choose Qualcomm QNN as the LLM provider to target the NPU
  - Choose the model of Llama 3.2 3B Chat with 8K context
- Create a workspace by clicking "+ New Workspace"
- Generate an API key
  - Click the settings button on the bottom of the left panel
  - Open the "Tools" dropdown
  - Click "Developer API"
  - Click "Generate New API Key"

### 6.2 Backend
- Clone the repo
  - https://github.com/linmengl28/Hackathon-HelloWorld-Teamwork-Compatibility-Checker.git

- Navigate to the `backend/` directory 
  - cd backend
    
- Create a virtual environment:
  - python3 -m venv venv

- Activate the virtual environment
  - max/linux: source venv/bin/activate
  - windows: venv\Scripts\activate
    
- Install the requirements
  - pip install -r requirements.txt

- Create your.env file with the following variables
  - api_key: "your-key-here"
  - model_server_base_url: "http://localhost:3001/api/v1"
  - workspace_slug: "your-slug-here"

- Test the model server auth to verify the API key
  - python src/auth.py

- Run the FastAPI backend server:
  - uvicorn app.main:app --reload

## 7. Usage
- Run the frontend
  - npm run dev

- Run the FastAPI backend server: 
  - uvicorn app.main:app --reload
  - 👉 By default, your API documentation will be available at:
        http://localhost:8000/docs
## 8. Demo

### Dashboard Result Example

Below are some screenshots demonstrating the results from the dashboard:

#### Screenshot 1:
![Screenshot 2025-03-16 140701](https://github.com/user-attachments/assets/267609a4-0c32-45e2-9508-934f9633504c)

#### Screenshot 2:
![Screenshot 2025-03-16 140732](https://github.com/user-attachments/assets/ac4306d2-d5df-43e6-a579-4384e6a8abad)

These screenshots show the various aspects of the dashboard and how the data is visualized.

## 9. Connect
- Bowang Lin: ​​bowanglin@gmail.com
- Di Mu: https://www.linkedin.com/in/di-mu/
- Jingjing Ji: http://linkedin.com/in/jingjingji
- Menglin Lin: https://www.linkedin.com/in/menglin-lin-47a1b8191
- Shuna Jiang: https://www.linkedin.com/in/shuna-jiang/

## 10. License
This project is licensed under the MIT License.  
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)  
See the [LICENSE](LICENSE) file for details.





