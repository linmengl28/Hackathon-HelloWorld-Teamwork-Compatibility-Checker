import json
import requests
from app.schemas.compatibility import CompatibilityResultResponse
from app.db.questionnaire import questionnaire
from app.db.candidate_response import candidate_response
from app.db.team_response import team_response
import os
from dotenv import load_dotenv

load_dotenv()

# Class to interact with the workspace API
class WorkspaceAPIClient:
    def __init__(self):
        self.api_key = "853RBK4-P03MXZJ-JXR3MQV-FWPW20V"
        self.workspace_slug = 'teamcompatibility'
        self.chat_url = f"http://localhost:3001/api/v1/workspace/{self.workspace_slug}/chat"

    def chat(self, message: str) -> dict:
        headers = {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + self.api_key
        }

        # Prepare data for the API request
        data = {
            "message": message,
            "mode": "chat",
            "sessionId": "example-session-id",
            "attachments": [],
            "history": []  # No message history
        }

        # Send the request to the workspace API
        response = requests.post(self.chat_url, headers=headers, json=data)

        # Check if the request was successful
        if response.status_code == 200:
            # Parse the JSON response from the workspace API
            response_data = response.json()

            # Extract the textResponse part of the response which contains the compatibility result
            text_response = response_data.get("textResponse", None)

            if text_response:
                try:
                    # Log the raw text response for debugging
                    print(f"Raw Text Response: {text_response}")

                    # Handle potential formatting issues
                    # Check if it ends correctly with a closing brace
                    if not text_response.strip().endswith("}"):
                        print("JSON response appears to be truncated")
                        # Attempt to fix it by adding a closing brace if missing
                        text_response = text_response.strip() + "}"

                    # Add error handling and validation for the JSON response
                    parsed_response = json.loads(text_response)

                    # Validate that all required fields are present
                    required_fields = ["candidate_id", "team_id", "overall_score", "dimension_scores", 
                                       "strengths", "challenges", "summary"]
                    for field in required_fields:
                        if field not in parsed_response:
                            raise ValueError(f"Missing required field '{field}' in response")
                    
                    return parsed_response
                except json.JSONDecodeError as e:
                    print(f"JSON parsing error: {e}")
                    print(f"Response content: {text_response}")
                    raise ValueError(f"Invalid JSON response from workspace API") from e
            else:
                raise ValueError("No textResponse found in the API response")
        else:
            raise ValueError(f"API request failed with status code {response.status_code}: {response.text}")

# Format prompt for one candidate & one team
def format_prompt_for_pair(questionnaire, candidate, team):
    intro = """
You are an expert in analyzing teamwork compatibility.

Compare the answers of the following candidate and team across a multiple-choice questionnaire.

Your task:
1. For each category (work_style, adaptability, etc.), calculate a score (0–100).
2. Compute an overall_score.
3. List key strengths and challenges in short words.
4. Summarize your findings clearly.

Return only one JSON object with this format:

{
  "candidate_id": 2,
  "team_id": 1,
  "overall_score": 85.0,
  "dimension_scores": {
    "work_style": 80,
    "communication_style": 75,
    "collaboration": 90,
    "problem_solving": 88,
    "adaptability": 82
  },
  "strengths": ["...", "..."],
  "challenges": ["...", "..."],
  "summary": "..."
}
""".strip()

    prompt = f"Candidate ID: {candidate['candidate_id']}\nTeam ID: {team['team_id']}\n\n"

    for q in questionnaire:
        qid = q["id"]
        prompt += f"Q{qid} ({q['category']}): {q['text']}\n"
        prompt += f"- Candidate: {candidate['answers'].get(qid, 'N/A')}\n"
        prompt += f"- Team: {team['answers'].get(qid, 'N/A')}\n\n"

    return intro + "\n\n" + prompt.strip()


# Main function to calculate ONE match
def calculate_compatibility(candidate_id: int, team_id: int) -> CompatibilityResultResponse:
    if candidate_id != candidate_response["candidate_id"]:
        raise ValueError("Candidate not found")

    team = next((t for t in team_response if t["team_id"] == team_id), None)
    if not team:
        raise ValueError("Team not found")

    prompt = format_prompt_for_pair(
        questionnaire=questionnaire["questions"],
        candidate=candidate_response,
        team=team
    )

    # Initialize the Workspace API Client
    client = WorkspaceAPIClient()
    ai_result = client.chat(prompt)

    # Return the result in the format expected by CompatibilityResultResponse
    return CompatibilityResultResponse(
        candidate_id=ai_result["candidate_id"],
        team_id=ai_result["team_id"],
        overall_score=ai_result["overall_score"],
        dimension_scores=ai_result["dimension_scores"],
        strengths=ai_result["strengths"],
        challenges=ai_result["challenges"],
        summary=ai_result["summary"]
    )

