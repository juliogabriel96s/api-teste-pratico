import { EstablishmentsRules } from "@/db/entity/estabilishment-rules";
import { EstablishmentRulesRepository } from "../establishment-rules-repository";
import { randomUUID } from "crypto";

export class InMemoryEstablishmentRuleRepository implements EstablishmentRulesRepository{

    public Items: EstablishmentsRules[] = []
    
        async create(data: EstablishmentsRules) {
            const establishmentsRules = {
                id: randomUUID() || data.id,
                 establishmentId: data.establishmentId,
                 picturesLimit: data.picturesLimit,
                 videoLimit: data.videoLimit
    
            }
    
            this.Items.push(establishmentsRules)
    
            return establishmentsRules
        }
        
        async findById(id: string) {
             const establishmentsRules = this.Items.find(item => item.id === id)
    
            if(!establishmentsRules){
                return null
            }
    
            return establishmentsRules
        }
    
        async save(establishmentsRules: EstablishmentsRules) {
            const itemIndex = this.Items.findIndex(item => item.id === establishmentsRules.id)
    
            this.Items[itemIndex] = establishmentsRules
    
            return establishmentsRules
        }
        async delete(id: string) {
             const itemIndex = this.Items.findIndex(item => item.id === id)
    
             if(itemIndex > -1){
                this.Items.splice(itemIndex, 1)
             }
    
        }

}