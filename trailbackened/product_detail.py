from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import mysql.connector
from fastapi.responses import JSONResponse

app = FastAPI()

# configure CORS
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# configure database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Deepika!2922",
    database="deepika"
)


# define product model
class Product(BaseModel):
    id: int
    name: str
    price: float
    description :str
    category: str 
    image: str

# API endpoint to get a single product by ID

@app.get("/products/{id}", response_model=Product)
def read_product(id: int):
    # Execute SQL query to retrieve product from database
    cursor=db.cursor()
    query = f"SELECT * FROM products WHERE id ={id}"
   

    cursor.execute(query)

    row = cursor.fetchone()

    if row is not None:
        product = {
            'id': row[0],
            'name': row[1],
            'description': row[2],
            'price': row[3],
            'image': row[5]
        }
        return JSONResponse(content=product)
    else:
        return JSONResponse(content={"error": "Product not found"})
    





