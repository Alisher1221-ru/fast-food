import db from "../config/db.config.js"

async function getimagess(req, res) {
    try {
        const [product_images] = await db.query("SELECT * FROM product_images") 
        if (!product_images){
            const error = new Error("error product_images not found")
            error.status = 403
            throw error
        }
        res.json(product_images)
    } catch (error) {
        res.status(error.status || 500).json("error in "+ error.message)
    }
}

async function getimages(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("id is not defined")
            error.status = 403
            throw error
        }
        const [product_images] = await db.query("SELECT * FROM product_images WHERE product_id = ?", id)
        if (!product_images) {
            const error = new Error("product_images is not defined")
            error.status = 403
            throw error
        }
        res.json(product_images)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function postimages(req, res) {
    try {
        const body = req.body
        if (!body) {
            const err = new Error("error in "+ err.message)
            err.status = 400
            throw err
        }
        await db.query("INSERT INTO product_images SET ?", body)
        res.json('product_images created')
    } catch (error) {
        res.status(error.status || 500).json("error in "+ error.message)
    }
}

async function updateimages(req, res) {
    try {
        const body = req.body
        if (!body) {
            const err = new Error("error in "+ err.message)
            err.status = 401
            throw err
        }
        const id = req.params.id;
        const [[product_images]] = await db.query("SELECT * FROM product_images WHERE id = ?", id)
        if (!product_images) {
            const err = new Error("error in "+ err.message)
            err.status = 401
            throw err
        }
        const updated_at = new Date()
        await db.query("UPDATE product_images SET ?, updated_at = ? WHERE id = ?", [body, updated_at, id])
        res.json('product_images updated')
    } catch (error) {
        res.status(error.status || 500).json("error in "+ error.message)
    }
}

async function deleteimages(req, res) {
    try {
        const id = req.params.id
        const [[product_images]] = await db.query("SELECT * FROM product_images WHERE id = ?", id)
        if (!product_images) {
            const err = new Error("error in "+ err.message)
            err.status = 401
            throw err
        }
        await db.query("DELETE FROM product_images WHERE id = ?", id)
        res.json('product_images deleted')
    } catch (error) {
        res.status(error.status || 500).json("error in "+ error.message)
    }
}

export {
    getimagess,
    getimages,
    postimages,
    updateimages,
    deleteimages
}


/////// test images

// {
//     "img": "",
//     "product_id": 1
// }
