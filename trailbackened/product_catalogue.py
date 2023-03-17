from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
import mysql.connector
from fastapi import FastAPI, Depends, HTTPException
from auth import AuthHandler


app = FastAPI()

auth_handler = AuthHandler()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MySQL connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Deepika!2922",
    database="deepika"
)


class Product(BaseModel):
    id: int
    name: str
    price: float
    description :str
    category: str 
    image: str

# Define a function to get the products from the database
def get_products():
    cursor = db.cursor()
    query = 'SELECT * FROM products'
    cursor.execute(query)
    results = cursor.fetchall()
    products = []
    for result in results:
        product = {
            'id': result[0],
            'name': result[1],
            'description': result[2],
            'price': result[3],
            'image':result[5]
        }
        print(result[0],"\n",result[1],"\n",result[2],"\n",result[3],"\n",result[5])
        products.append(product)
    return products

# Define a route to get the products data as JSON
@app.get('/products')
def products(userid=Depends(auth_handler.auth_wrapper)):
    
    products = get_products()
    return products
