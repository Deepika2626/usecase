from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector

app = FastAPI()

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)


db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Deepika!2922",
    database="deepika"
)

# Define request and response models
class UserRegistrationRequest(BaseModel):
    email: str
    password: str

class UserRegistrationResponse(BaseModel):
    message: str

# Define routes
@app.post("/signup", response_model=UserRegistrationResponse)
def register_user(user_request: UserRegistrationRequest):
    email = user_request.email
    password = user_request.password

    # Check if user with given email already exists in database
    cursor = db.cursor()
    cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
    existing_user = cursor.fetchone()

    if existing_user:
        return {"message": "User with this email already exists"}

    # Insert new user into database
    cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password))
    db.commit()

    return {"message": "created"}

