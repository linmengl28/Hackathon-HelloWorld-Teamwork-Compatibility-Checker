from dotenv import load_dotenv
import os
from app.db.questionnaire import questionnaire
from app.db.candidate_response import candidate_response
from app.db.team_response import team_response
from app.services.compatibility_analyzer import format_prompt, call_ai

# 加载 .env 中的 API key
load_dotenv()
import openai
openai.api_key = os.getenv("OPENAI_API_KEY")

# 构建 prompt
prompt = format_prompt(
    questionnaire=questionnaire["questions"],
    candidate=candidate_response,
    all_teams=team_response
)

# 打印 prompt（可选）
print("发送给 GPT 的 prompt：\n")
print(prompt)

# 调用 GPT 分析
response = call_ai(prompt)

# 打印返回内容
print("\nGPT 分析返回：\n")
print(response)
