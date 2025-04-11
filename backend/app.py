from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import random

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
    conn = sqlite3.connect("words.db")
    cursor = conn.cursor()
    cursor.execute("SELECT word FROM words")
    all_words = cursor.fetchall()
    conn.close()

    word = random.choice(all_words)[0]
    return {"word" : word}

@app.route("/valid_word")
def is_valid(word):
    return {"valid" : "true"}