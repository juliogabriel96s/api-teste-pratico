import { FastifyInstance } from "fastify";
import { CreateEstablishmentRules } from "./create";
import { GetEstablishmentRuleId } from "./get";
import { EditEstablishmentRules } from "./edit";
import { DeleteEstablishmentRule } from "./delete";

export async function EstablishmentRuleRoutes(app: FastifyInstance){
    app.post("/establishmentRule/:establishmentId", CreateEstablishmentRules)
    app.get("/establishmentRule/:establishmentRulesId", GetEstablishmentRuleId)
    app.put("/establishmentRule/:establishmentRulesId", EditEstablishmentRules)
    app.delete("/establishmentRule/:establishmentRulesId", DeleteEstablishmentRule)

}