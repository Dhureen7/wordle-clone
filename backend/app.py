from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message", "hello from the server side"}

@app.get("/get_word")
def get_word():
    return {"word": "adieu"}

@app.route("/valid_word")
def is_valid(word):
    return {"valid" : "true"}