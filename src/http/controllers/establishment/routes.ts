import { authenticate } from "@/http/middlewares/hook-verify-user";
import { verifyUserType } from "@/http/middlewares/verify-user-types";
import { FastifyInstance } from "fastify";
import { CreateEstablishment } from "./create";
import { GetEstablishmentId } from "./getId";
import { EditEstablishment } from "./edit";
import { DeletetEstablishment } from "./delete";
import { GetTypeEstablishment } from "./getType";
import { GetAllEstablishment } from "./getAll";


export async function establishmentRoutes(app: FastifyInstance){

    app.addHook("onRequest", authenticate);

    app.post('/establishment/:ownerId', { preHandler: [verifyUserType('owner')] }, CreateEstablishment )
    app.get('/establishment/:establishmentId', GetEstablishmentId)
    app.post('/establishment/type', GetTypeEstablishment)
    app.get('/establishment/all', GetAllEstablishment)
    app.put('/establishment/:establishmentId', EditEstablishment)
    app.delete('/establishment/:establishmentId', DeletetEstablishment)
    
}