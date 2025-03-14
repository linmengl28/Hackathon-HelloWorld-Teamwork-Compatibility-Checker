from app.schemas.compatibility import CompatibilityResultResponse
from app.db.questionnaire import questionnaire
from app.db.candidate_response import candidate_response
from app.db.team_response import team_response
import json
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

# Format prompt for one candidate & one team
def format_prompt_for_pair(questionnaire, candidate, team):
    intro = """
You are an expert in analyzing teamwork compatibility.

Compare the answers of the following candidate and team across a multiple-choice questionnaire.

Your task:
1. For each category (work_style, adaptability, etc.), calculate a score (0–100).
2. Compute an overall_score.
3. List key strengths and challenges.
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


# GPT call for candidate-team compatibility
def call_ai(prompt: str) -> dict:
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt.strip()}],
        temperature=0.7
    )

    content = response.choices[0].message.content
    print("🧠 GPT raw response:\n", content)

    # Remove anything before JSON block (if GPT adds text)
    json_start = content.find("{")
    json_text = content[json_start:]

    try:
        return json.loads(json_text)
    except json.JSONDecodeError as e:
        raise ValueError(f"GPT response was not valid JSON:\n{content}") from e


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

    ai_result = call_ai(prompt)

    return CompatibilityResultResponse(
        candidate_id=ai_result["candidate_id"],
        team_id=ai_result["team_id"],
        overall_score=ai_result["overall_score"],
        dimension_scores=ai_result["dimension_scores"],
        strengths=ai_result["strengths"],
        challenges=ai_result["challenges"],
        summary=ai_result["summary"]
    )
