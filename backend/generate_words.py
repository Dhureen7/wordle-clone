import sqlite3

conn = sqlite3.connect("words.db")
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT UNIQUE NOT NULL
    )
""")

with open("five_letter_words.txt", "r") as f:
    words = [line.strip().upper() for line in f if len(line.strip()) == 5]

for word in words:
    try:
        cursor.execute("INSERT INTO words (word) VALUES (?)", (word,))
    except sqlite3.IntegrityError:
        continue

conn.commit()
conn.close()
print("Database setup complete!")
