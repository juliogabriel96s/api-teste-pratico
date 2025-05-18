import { InMemoryUserRepository } from "@/repository/in-memory-repository/in-memory-user-repository"
import {describe, beforeEach, it, expect} from 'vitest'
import { InMemoryEstablishmentRepository } from "@/repository/in-memory-repository/in-memory-establishment-repository"
import { randomUUID } from "crypto"
import { GetEstablishmentUseCase } from "./get-establishment"


let inMemoryUserRepository: InMemoryUserRepository
let inMemoryEstablishmentRepository: InMemoryEstablishmentRepository
let sut: GetEstablishmentUseCase

describe('Get establishment', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryEstablishmentRepository = new InMemoryEstablishmentRepository()
    sut = new GetEstablishmentUseCase(inMemoryEstablishmentRepository)
})

it('Should be able get a establishment with id', async() =>{

    const user = await inMemoryUserRepository.create({
              id: randomUUID(),
              name: 'john doe',
               email: 'johndoe@example.com',
               type: 'owner'
    })

    const establishment = await inMemoryEstablishmentRepository.create({
                id: randomUUID(),
                name: "establishment examplo",
                ownerId: user.id,
                type: 'local'
    })
    const result = await sut.execute({
        establishmentId: establishment.id
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able to get with establishmentId wrong', async() =>{
       const user = await inMemoryUserRepository.create({
              id: randomUUID(),
              name: 'john doe',
               email: 'johndoe@example.com',
               type: 'owner'
        })
       const result = await sut.execute({
        establishmentId:'id_wrong'
         })

    expect(result.isLeft()).toBe(true)
    
})
})