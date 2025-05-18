import { Establishment } from "@/db/entity/estabilishment";
import { EstabilishmentRepository } from "../estabilishment-repository";
import { randomUUID } from "crypto";

export class InMemoryEstablishmentRepository implements EstabilishmentRepository{

     public Items: Establishment[] = []


    async create(data: Establishment) {
         const establishment = {
               id: randomUUID() || data.id,
               name: data.name,
               type: data.type,
               ownerId: data.ownerId
   
           }
   
           this.Items.push(establishment)
   
           return establishment
    }
    async findByType(type: string) {
         const establishment = this.Items.find(item => item.type === type)
   
           if(!establishment){
               return null
           }
   
           return establishment
    }
    async findById(id: string) {
        const establishment = this.Items.find(item => item.id === id)
   
           if(!establishment){
               return null
           }
   
           return establishment
    }
    async save(estabilishmentId: Establishment) {
         const itemIndex = this.Items.findIndex(item => item.id === estabilishmentId.id)
   
           this.Items[itemIndex] = estabilishmentId
   
           return estabilishmentId
    }
    async delete(id: string) {
         const itemIndex = this.Items.findIndex(item => item.id === id)
   
        if(itemIndex > -1){
            this.Items.splice(itemIndex, 1)
        }
        }
    async findAll() {
         return this.Items

        }
}