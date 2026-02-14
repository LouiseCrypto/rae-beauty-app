# @ts-nocheck
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from pydantic import BaseModel
from typing import Optional, List
from datetime import date
import uvicorn

app = FastAPI()

# This is the "Doorbell" that lets your React app talk to this Python code
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODELS (The Blueprints) ---
class Client(BaseModel):
    name: str
    phone: str
    email: Optional[str] = ""
    notes: Optional[str] = ""

class Appointment(BaseModel):
    client_id: int
    service: str
    price: float 
    date: str
    time: str

class ServiceItem(BaseModel):
    name: str
    price: float

class BusinessInfo(BaseModel):
    salon_name: str
    accent_color: str

# --- CLIENT ROUTES ---
@app.post("/add-client")
async def add_client(client: Client):
    try:
        conn = sqlite3.connect('rae_beauty.db')
        cursor = conn.cursor()
        cursor.execute("INSERT INTO clients (name, phone, email, notes) VALUES (?, ?, ?, ?)",
                       (client.name, client.phone, client.email, client.notes))
        conn.commit()
        conn.close()
        return {"message": "Client added!"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/clients")
async def get_clients():
    conn = sqlite3.connect('rae_beauty.db')
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, phone, email, notes FROM clients ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return rows

@app.delete("/delete-client/{client_id}")
async def delete_client(client_id: int):
    conn = sqlite3.connect('rae_beauty.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM clients WHERE id=?", (client_id,))
    conn.commit()
    conn.close()
    return {"message": "Deleted!"}

# --- APPOINTMENT ROUTES ---
@app.post("/book-appointment")
async def book_appt(appt: Appointment):
    try:
        conn = sqlite3.connect('rae_beauty.db')
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO appointments (client_id, service, price, date, time, status) VALUES (?, ?, ?, ?, ?, ?)",
            (appt.client_id, appt.service, appt.price, appt.date, appt.time, "Confirmed")
        )
        conn.commit()
        conn.close()
        return {"message": "Appointment booked!"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/appointments")
async def get_appts():
    try:
        conn = sqlite3.connect('rae_beauty.db')
        cursor = conn.cursor()
        cursor.execute("""
            SELECT a.id, c.name, a.service, a.date, a.time, a.status, a.price 
            FROM appointments a 
            LEFT JOIN clients c ON a.client_id = c.id
            ORDER BY a.date ASC, a.time ASC
        """)
        rows = cursor.fetchall()
        conn.close()
        return rows
    except Exception as e:
        return []

# --- DASHBOARD STATS (The "Clean Slate" Math) ---
@app.get("/dashboard-stats")
async def get_stats():
    try:
        conn = sqlite3.connect('rae_beauty.db')
        cursor = conn.cursor()
        
        # 1. Real Client Count
        cursor.execute("SELECT COUNT(*) FROM clients")
        total_clients = cursor.fetchone()[0]
        
        # 2. Real Appointments for Today
        today = date.today().isoformat()
        cursor.execute("SELECT COUNT(*) FROM appointments WHERE date = ?", (today,))
        today_count = cursor.fetchone()[0]
        
        # 3. Real Revenue Sum for the current month
        current_month = date.today().strftime("%Y-%m")
        cursor.execute("SELECT SUM(price) FROM appointments WHERE date LIKE ?", (f"{current_month}%",))
        revenue_sum = cursor.fetchone()[0]
        
        conn.close()
        return {
            "active_clients": total_clients,
            "today_appointments": today_count,
            "revenue": revenue_sum if revenue_sum else 0 
        }
    except Exception as e:
        return {"error": str(e)}
    
# --- SERVICE MENU ROUTES ---
@app.get("/services")
async def get_services():
    conn = sqlite3.connect('rae_beauty.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM services")
    rows = cursor.fetchall()
    conn.close()
    return rows

@app.post("/add-service")
async def add_service(item: ServiceItem):
    conn = sqlite3.connect('rae_beauty.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO services (name, price) VALUES (?, ?)", (item.name, item.price))
    conn.commit()
    conn.close()
    return {"message": "Service added!"}

# --- STARTUP & DATABASE SETUP ---
if __name__ == "__main__":
    conn = sqlite3.connect('rae_beauty.db')
    cursor = conn.cursor()
    
    # Create tables if they aren't there
    cursor.execute("CREATE TABLE IF NOT EXISTS clients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, email TEXT, notes TEXT DEFAULT '')")
    cursor.execute("CREATE TABLE IF NOT EXISTS appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, client_id INTEGER, service TEXT, price REAL DEFAULT 0.0, date TEXT, time TEXT, status TEXT)")
    cursor.execute("CREATE TABLE IF NOT EXISTS services (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL)")
    cursor.execute("CREATE TABLE IF NOT EXISTS business_info (id INTEGER PRIMARY KEY, salon_name TEXT, currency TEXT, accent_color TEXT)")

    cursor.execute("SELECT COUNT(*) FROM business_info")
    if cursor.fetchone()[0] == 0:
        cursor.execute("INSERT INTO business_info (id, salon_name, currency, accent_color) VALUES (1, 'Rae Beauty', '£', '#84a98c')")
    
    conn.commit()
    conn.close()
    print("🚀 Rae Beauty Brain is Running!")
    uvicorn.run(app, host="127.0.0.1", port=8000)