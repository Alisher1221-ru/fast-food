import db from "../config/db.config.js"

async function getProducts(req, res) {
    try {
        const [product] = await db.query("SELECT * FROM product") 
        if (!product){
            const error = new Error("error product not found")
            error.status = 403
            throw error
        }
        res.json(product)
    } catch (error) {
        res.status(error.status || 500).json("error in "+ error.message)
    }
}

async function getProduct(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("id is not defined")
            error.status = 403
            throw error
        }
        const [[product]] = await db.query("SELECT * FROM product WHERE id = ?", id)
        if (!product) {
            const error = new Error("product is not defined")
            error.status = 403
            throw error
        }
        res.json(product)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function postControler(req, res) {
    try {
        const {description, price, title, img} = req.body
        if (!description || !price || !title || !img) {
            const error = new Error("error in "+ error.message)
            error.status = 400
            throw error
        }
        await db.query("INSERT INTO product SET ?", {description, price, title, img})
        res.json('product created')
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json("error in "+ error.message)
    }
}

async function updateControler(req, res) {
    try {
        const body = req.body
        if (!body) {
            const err = new Error("error in "+ err.message)
            err.status = 401
            throw err
        }
        const id = req.params.id;
        const [[product]] = await db.query("SELECT * FROM product WHERE id = ?", id)
        if (!product) {
            const err = new Error("error in "+ err.message)
            err.status = 401
            throw err
        }
        const updated_at = new Date()
        await db.query("UPDATE product SET ?, updated_at = ? WHERE id = ?", [body, updated_at, id])
        res.json('product updated')
    } catch (error) {
        res.status(error.status || 500).json("error in "+ error.message)
    }
}

async function deleteControler(req, res) {
    try {
        const id = req.params.id
        const [[product]] = await db.query("SELECT * FROM product WHERE id = ?", id)
        if (!product) {
            const err = new Error("error in "+ err.message)
            err.status = 401
            throw err
        }
        await db.query("DELETE FROM product WHERE id = ?", id)
        res.json('product deleted')
    } catch (error) {
        res.status(error.status || 500).json("error in "+ error.message)
    }
}

export {
    getProducts,
    getProduct,
    postControler,
    updateControler,
    deleteControler
}


/////// test product

// {
//     "description": "samsung f2",
//     "price": 5000000,
//     "title": "title asl adla slad",
//     "img": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D"

