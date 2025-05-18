import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { userRoutes } from "./http/controllers/users/routes";
import { establishmentRoutes } from "./http/controllers/establishment/routes";
import { productRoutes } from "./http/controllers/products/routes";
import { EstablishmentRuleRoutes } from "./http/controllers/establishmentRules/routes";

export const app = fastify()

app.register(userRoutes)
app.register(establishmentRoutes)
app.register(productRoutes)
app.register(EstablishmentRuleRoutes)

app.setErrorHandler((error, request, reply) =>{
    if(error instanceof ZodError){
        return reply
        .status(400)
        .send({message: "Validation error", issues: error.format()})
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error)
    }
    else{

    }

    return reply.status(500).send({message: "Internal server error."})

})