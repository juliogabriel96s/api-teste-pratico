import { FastifyInstance } from "fastify";
import { CreateProduct } from "./create";
import { DeletetProduct } from "./delete";
import { EditProduct } from "./edit";
import { GetAllProduct } from "./getAll";
import { GetProductId } from "./getid";

export async function productRoutes(app: FastifyInstance){
    app.post("/product/:establishmentId", CreateProduct)
    app.delete("/product/:productId", DeletetProduct)
    app.put("/product/:productId", EditProduct)
    app.get("/product", GetAllProduct)
    app.get("/product/:productId", GetProductId)

}