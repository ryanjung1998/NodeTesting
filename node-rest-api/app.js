import express from "express"
import prisma from "./prisma.js" // importing the prisma instance we created.

const app = express ()
app.use(express.json())
const PORT = process.env.PORT || 3000 //setting port to listen on

app.listen(PORT, () => { //setting up to listen for requests on that port
    console.log("Server Listening on PORT:", PORT)
})

app.post("/product", async (request, response) => {
    try {
        const {title, size, color, description, gender, category, price, imageUrl} = req.body
        const newProduct = await prisma.product.create({
            data: {
                title, size, color, description, gender, category, price, imageUrl
            }
        })
        response.json(newProduct)
    } catch (error){
        console.log(error.message)
            resizeBy.status(500).json({
                message: "Internal Server Error",
            })
        }
}) 

app.get("/status", (request, response) => {
    const status = {
       "Status": "Running"
    }
    
    response.send(status)
})

app.get("/products", (request, response) => {
    const products = {
        "1": "Shirt",
        "2": "Pants",
        "3": "Jacket"
    }
    
    response.send(products)
})

app.get("/product/:id", (request, response) => {
    let prodID = request.params.id
    const product = {
        "id" : prodID,
        "title": "Red Shirt",
        "size": "M",
        "color": "Red",
        "description": "some words",
        "gender": "Male",
        "category": "shirt",
        "price": 12
        }
    
    response.send(product)
})