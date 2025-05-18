import { InMemoryUserRepository } from "@/repository/in-memory-repository/in-memory-user-repository"
import {describe, beforeEach, it, expect} from 'vitest'
import { InMemoryEstablishmentRepository } from "@/repository/in-memory-repository/in-memory-establishment-repository"
import { randomUUID } from "crypto"
import { InMemoryEstablishmentRuleRepository } from "@/repository/in-memory-repository/in-memory-establishment-rules-repository"
import { CreateEstablishmentRuleUseCase } from "./create-establishments-rules"


let inMemoryUserRepository: InMemoryUserRepository
let inMemoryEstablishmentRepository: InMemoryEstablishmentRepository
let inMemoryEstablishmentRuleRepository: InMemoryEstablishmentRuleRepository
let sut: CreateEstablishmentRuleUseCase

describe('Register Establishment rule', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryEstablishmentRepository = new InMemoryEstablishmentRepository()
    inMemoryEstablishmentRuleRepository = new InMemoryEstablishmentRuleRepository()

    sut = new CreateEstablishmentRuleUseCase(
        inMemoryEstablishmentRepository,
        inMemoryEstablishmentRuleRepository
    )
})

it('Should be able create a establishment rule', async() =>{

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
    const result = await sut.execute({
          establishmentId: estabilishment.id,
          picturesLimit: 2,
          videoLimit: 3
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able to create  a establishment rule with establishment id wrong', async() =>{
       const user = await inMemoryUserRepository.create({
              id: randomUUID(),
              name: 'john doe',
               email: 'johndoe@example.com',
               type: 'owner'
        })
       const result = await sut.execute({
         establishmentId: "id-wrong",
          picturesLimit: 2,
          videoLimit: 3
         })

    expect(result.isLeft()).toBe(true)
})
})