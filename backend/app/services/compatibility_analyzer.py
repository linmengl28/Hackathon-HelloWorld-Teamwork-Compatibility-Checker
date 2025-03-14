from app.schemas.compatibility import CompatibilityResultResponse
from app.db.questionnaire import questionnaire
from app.db.candidate_response import candidate_response
from app.db.team_response import team_response
import json
from dotenv import load_dotenv
from openai import OpenAI
import os
from typing import List

load_dotenv()

# Format the full GPT prompt
def format_prompt(questionnaire, candidate, all_teams):
    intro = """
The following prompt contains important background instructions. Please follow them carefully.

You are an expert in analyzing teamwork compatibility.

Given:
- A list of multiple-choice questionnaire questions, each mapped to a category.
- Answers from a candidate.
- Answers from multiple teams.

Your task:
1. Compare the candidate's answers with teams'.
2. For each category, calculate a compatibility score (0–100).
3. Generate an `overall_score` (average of categories).
4. List key `strengths` and `challenges`.
5. Return a clear summary.

Return a **list of JSON objects**, one per team, in the following format:
{
  "candidate_id": 1,
  "team_id": 1,
  "overall_score": 78.5,
  "dimension_scores": {
    "work_style": 85,
    "communication_style": 72,
    ...
  },
  "strengths": [ "..." ],
  "challenges": [ "..." ],
  "summary": "..."
}

---

Now, here is the data:
"""

    prompt = f"Candidate: {candidate['candidate_id']}\n\n"
    for q in questionnaire:
        qid = q["id"]
        prompt += f"Q{qid} ({q['category']}): {q['text']}\n"
        prompt += f"- Candidate: {candidate['answers'].get(qid, 'N/A')}\n"
        for team in all_teams:
            prompt += f"- Team {team['team_id']}: {team['answers'].get(qid, 'N/A')}\n"
        prompt += "\n"

    return intro.strip() + "\n\n" + prompt.strip()


# GPT Call
def call_ai(prompt: str) -> dict | list:
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": prompt.strip()}
        ],
        temperature=0.7
    )

    content = response.choices[0].message.content
    print("GPT raw response:\n", content)

    try:
#         json_text = content[content.find("{"):]
        return json.loads(content)
    except json.JSONDecodeError as e:
        raise ValueError(f"GPT response was not valid JSON:\n{content}") from e

# Main compatibility analysis function
def calculate_compatibility_all_teams(candidate_id: int) -> List[CompatibilityResultResponse]:

    if candidate_id != candidate_response["candidate_id"]:
        raise ValueError("Candidate not found")

    prompt = format_prompt(
        questionnaire=questionnaire["questions"],
        candidate=candidate_response,
        all_teams=team_response
    )

    ai_results = call_ai(prompt)  # this will return a list of dicts

    responses = []
    for result in ai_results:
        response = CompatibilityResultResponse(
            candidate_id=result["candidate_id"],
            team_id=result["team_id"],
            overall_score=result["overall_score"],
            dimension_scores=result["dimension_scores"],
            strengths=result["strengths"],
            challenges=result["challenges"],
            summary=result["summary"]
        )

        # Save to your in-memory store for now (later to DB)
#         DUMMY_DB[(result["candidate_id"], result["team_id"])] = response
#         responses.append(response)

    return responses
