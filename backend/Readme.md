## 🚀 Backend Environment Setup (FastAPI)
```bash
1. Navigate to the `backend/` directory and create a virtual environment:
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate


2. Install dependencies:
   pip install -r requirements.txt

3. Configure the .env file:
   👉 First, copy the example file:
      cp .env.example .env

   👉 Then open .env and insert your real OpenAI API key:
      OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

   ⚠️ Do not share this .env file or commit it to Git. Keep your key safe!

4. Run the FastAPI backend server:
   uvicorn app.main:app --reload

   👉 By default, your API documentation will be available at:
      http://localhost:8000/docs
