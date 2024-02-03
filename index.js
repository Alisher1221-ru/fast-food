import express from "express"
import env from "./config/env.config.js"
import productServer from "./router/productRouter.js"
import userServers from "./router/userRoute.js"
import categoryServer from "./router/categoryRouter.js"
import CartServer from "./router/cartRouter.js"
import categoryProductsServer from "./router/categoryProductRouter.js"
import product_imagesRouter from "./router/product_imagesRouter.js"
import uploadRoute from "./router/create_product_images_router.js"
import CarouselImagesRouter from "./router/create_carousel_images_Router.js"
import caruselServer from "./router/caruselRouter.js"
import cors from "cors"

const port = env.PORT

const appServer = express()

appServer.use(express.json())
appServer.use(cors())
appServer.use('/products', productServer)
appServer.use('/auth', userServers)
appServer.use('/categorys', categoryServer)
appServer.use('/carts', CartServer)
appServer.use('/categorys-products', categoryProductsServer)
appServer.use('/images', product_imagesRouter)
appServer.use('/create-product-images', uploadRoute)
appServer.use('/create-carousel-images', CarouselImagesRouter)
appServer.use("/carusel", caruselServer)

appServer.listen(port, () => console.log(`Server Run port ${port} server`))
