import { EstablishmentsRules } from "@/db/entity/estabilishment-rules"

export interface EstablishmentRulesRepository{
    create(establishmentRule: EstablishmentsRules):Promise<EstablishmentsRules>
    findById(id: string):Promise<EstablishmentsRules | null>
    save(establishmentRule: EstablishmentsRules): Promise<EstablishmentsRules>
    delete(id: string): Promise<void>
}