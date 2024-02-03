import db from "../config/db.config.js"

async function createdcategorys_products(req, res) {
    try {
        const {product_id, category_id} = req.body
        if (!product_id || !category_id) {
            const error = new Error("body not fount")
            error.status = 400
            throw error
        }
        const [[categorys_products]] = await db.query("SELECT * FROM categorys_products WHERE product_id = ? AND category_id = ?", [product_id, category_id])
        if (categorys_products) {
            const error = new Error("categorys_products already exists")
            error.status =  404
            throw error
        }

        const [[product]] = await db.query("SELECT * FROM product WHERE id = ?", product_id)
        const [[category]] = await db.query("SELECT * FROM category WHERE id = ?", category_id)

        if (!product && !category) {
            const error = new Error("category or product not found")
            error.status =  400
            throw error
        }

        await db.query("INSERT INTO categorys_products SET ?", {product_id, category_id})
        res.json("categorys_products created")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getcategorys_productss(req, res) {
    try {
        const [categorys_products] = await db.query("SELECT * FROM categorys_products")
        if (!categorys_products) {
            const error = new Error('categorys_products not found')
            error.status = 400
            throw error
        }

        const joinQuery = `
        SELECT 
            p.id AS product_id,
            p.title,
            p.price,
            p.description,
            p.created_at AS product_created_at,
            p.updated_at AS product_updated_at,
            c.id AS category_id,
            c.name AS category_name,
            c.parant_id,
            c.created_at AS category_created_at,
            c.updated_at AS category_updated_at
        FROM 
            categorys_products AS cp
        JOIN 
            product AS p ON p.id = cp.product_id
        JOIN
            category AS c ON c.id = cp.category_id
        `

        const [categorysProducts] = await db.query(joinQuery)
        res.json(categorysProducts)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function updatecategorys_products(req, res) {
    try {
        const query = req.query
        if (!query) {
            const error = new Error('categorys_products not found')
            error.status = 400
            throw error
        }
        const [[categorys_products]] = await db.query("SELECT * FROM categorys_products WHERE product_id = ? AND category_id = ?", [query.product_id, query.category_id])
        if (!categorys_products) {
            const error = new Error('categorys_products not found')
            error.status = 400
            throw error
        }
        const body = req.body
        if (!body) {
            const error = new Error("body not found")
            error.status = 400
            throw error
        }
        await db.query("UPDATE categorys_products SET ? WHERE product_id = ? AND category_id = ?", [body, query.product_id, query.category_id])
        res.json("categorys_products updated")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function deletecategorys_products(req, res) {
    try {
        const query = req.query
        if (!query) {
            const error = new Error('categorys_products not found')
            error.status = 400
            throw error
        }

        const [[categorys_products]] = await db.query("SELECT * FROM categorys_products WHERE product_id = ? AND category_id = ?", [query.product_id, query.category_id])
        if (!categorys_products) {
            const error = new Error('categorys_products not found')
            error.status = 400
            throw error
        }

        await db.query("DELETE FROM categorys_products WHERE product_id = ? AND category_id = ?", [query.product_id, query.category_id])
        res.json("categorys_products deleted")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

export {createdcategorys_products, getcategorys_productss, updatecategorys_products, deletecategorys_products}



/////// test categorys_products

// {
//     "product_id": 1,
//     "category_id": 1
// }
