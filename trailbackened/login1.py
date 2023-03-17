from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
from auth import AuthHandler

auth_handler = AuthHandler()


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

class UserLoginResponse(BaseModel):
    message: str
    jwttoken: str

# Define routes
@app.post("/login", response_model=UserLoginResponse)
def login_user(user_request: UserRegistrationRequest):
    email = user_request.email
    password = user_request.password

    # Check if user with given email already exists in database
    cursor = db.cursor()
    cursor.execute("SELECT id FROM users WHERE email = %s AND password = %s", (email, password))
    existing_user = cursor.fetchone()
    print(existing_user)

    if existing_user:
        token = auth_handler.encode_token(existing_user[0])
        return {"message": "found","jwttoken": token}
    else:
        return {"message": "User does not exist in DB","jwttoken":"invalid"}
