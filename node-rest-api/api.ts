// const prisma = require('./prisma.js');
// const express = require('express');
import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const app = express ();
app.use(express.json());
const PORT = process.env.PORT || 3000; //setting port to listen on

app.listen(PORT, () => { //setting up to listen for requests on that port
    console.log(`[INFO]: Server is running at http://localhost:${PORT}/`);
});

app.post("/product", async (request, response) => {
    const {title, size, color, description, gender, category, price, imageUrl} = request.body
    const newProduct = await prisma.product.create({
        data: {
            title, size, color, description, gender, category, price, imageUrl
        }
    })
    response.json(newProduct)
}) 

app.get("/products", (request, response) => {
    const products = {
        "1": "Shirt",
        "2": "Pants",
        "3": "Jacket"
    };
    
    response.send(products);
});

app.get("/product/:id", (request, response) => {
    let prodID = request.params.id;
    const product = {
        "id" : prodID,
        "title": "Red Shirt",
        "size": "M",
        "color": "Red",
        "description": "some words",
        "gender": "Male",
        "category": "shirt",
        "price": 12
        };
    
    response.send(product);
});