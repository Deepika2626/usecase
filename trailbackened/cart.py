from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime
import mysql.connector
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Deepika!2922",
    database="deepika"
)

class Cart(BaseModel):
    id: int
    name : str
    quantity : int
    price : int



@app.post("/cart")
def add_to_cart(cart:Cart):
    cursor = db.cursor()
   
    cursor.execute("INSERT INTO cart1 (id,name, quantity,price) VALUES ( %s,%s, %s,%s)",
                   ( cart.id,cart.name, cart.quantity,cart.price))
    db.commit()
    return {"success": True}
# Get cart items
@app.get("/cart")
async def get_cart():
    mycursor = db.cursor()
    mycursor.execute("SELECT * FROM cart1")
    cart_items = mycursor.fetchall()
    cart = []
    for cart_item in cart_items:
        cart_items = {
            'id': cart_item[0],
            'name': cart_item[1],
            'quantity': cart_item[2],
            'price': cart_item[3],
            
        }
        
        cart.append(cart_item)
    return cart_items
# Remove item from cart
@app.delete("/cart/{id}")
async def remove_from_cart(id: int):
    mycursor = db.cursor()
    sql = "DELETE FROM cart1 WHERE id = %s"
    val = (id,)
    mycursor.execute(sql, val)
    db.commit()
    return {"message": "Item removed from cart"}