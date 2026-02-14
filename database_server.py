import sqlite3
import os

conn = sqlite3.connect('rae_beauty.db')
print("✅ Database file created!")
conn.close()