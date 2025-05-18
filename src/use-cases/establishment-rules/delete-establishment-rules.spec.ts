import { InMemoryUserRepository } from "@/repository/in-memory-repository/in-memory-user-repository"
import {describe, beforeEach, it, expect} from 'vitest'
import { InMemoryEstablishmentRepository } from "@/repository/in-memory-repository/in-memory-establishment-repository"
import { randomUUID } from "crypto"
import { InMemoryEstablishmentRuleRepository } from "@/repository/in-memory-repository/in-memory-establishment-rules-repository"
import { DeleteEstablishmentRuleUseCase } from "./delete-establishment-rules"


let inMemoryUserRepository: InMemoryUserRepository
let inMemoryEstablishmentRepository: InMemoryEstablishmentRepository
let inMemoryEstablishmentRuleRepository: InMemoryEstablishmentRuleRepository
let sut: DeleteEstablishmentRuleUseCase

describe('Delete Establishment rule', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryEstablishmentRepository = new InMemoryEstablishmentRepository()
    inMemoryEstablishmentRuleRepository = new InMemoryEstablishmentRuleRepository()

    sut = new DeleteEstablishmentRuleUseCase(inMemoryEstablishmentRuleRepository)
})

it('Should be able delete a establishment rule', async() =>{

    const user = await inMemoryUserRepository.create({
              id: randomUUID(),
              name: 'john doe',
               email: 'johndoe@example.com',
               type: 'owner'
    })

    const estabilishment = await inMemoryEstablishmentRepository.create({
            id: randomUUID(),
            name: "establishment examplo",
            ownerId: user.id,
            type: 'local'
    })

    const establishmentRule = await inMemoryEstablishmentRuleRepository.create({
             id: randomUUID(),
             establishmentId: estabilishment.id,
             picturesLimit: 2,
             videoLimit: 3
    })
    const result = await sut.execute({
          establishmentRulesId: establishmentRule.id,
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able to delete  a establishment rule with id wrong', async() =>{
       
       const result = await sut.execute({
         establishmentRulesId: 'id-wrong',
         })

    expect(result.isLeft()).toBe(true)
})
})