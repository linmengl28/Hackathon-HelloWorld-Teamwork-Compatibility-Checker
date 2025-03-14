from fastapi import FastAPI
import json

app = FastAPI()

@app.get("/")
def read_root():
    with open("config.json", "r") as file:
        data = json.load(file)
    return {"message": "Hello World!", "config": data}


