import { FastifyInstance } from "fastify";
import { CreateUser } from "./create";
import { GetUser } from "./get";
import { EditUser } from "./edit";
import { DeleteUser } from "./delete";
import { GetAllUser } from "./getAll";

export async function userRoutes(app: FastifyInstance){
    app.post('/user', CreateUser)
    app.get('/user/:userId', GetUser)
    app.get('/user', GetAllUser)
    app.put('/user/:userId', EditUser)
    app.delete('/user/:userId', DeleteUser)
    
}