import { InMemoryUserRepository } from "@/repository/in-memory-repository/in-memory-user-repository"
import {describe, beforeEach, it, expect} from 'vitest'
import { InMemoryEstablishmentRepository } from "@/repository/in-memory-repository/in-memory-establishment-repository"
import { randomUUID } from "crypto"
import { GetTypeEstablishmentUseCase } from "./get-type-establishment"


let inMemoryUserRepository: InMemoryUserRepository
let inMemoryEstablishmentRepository: InMemoryEstablishmentRepository
let sut: GetTypeEstablishmentUseCase

describe('Get type establishment', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryEstablishmentRepository = new InMemoryEstablishmentRepository()
    sut = new GetTypeEstablishmentUseCase(inMemoryEstablishmentRepository)
})

it('Should be able get a establishment with type', async() =>{

    const user = await inMemoryUserRepository.create({
              id: randomUUID(),
              name: 'john doe',
               email: 'johndoe@example.com',
               type: 'owner'
    })

      await inMemoryEstablishmentRepository.create({
                id: randomUUID(),
                name: "establishment examplo",
                ownerId: user.id,
                type: 'local'
    })
    const result = await sut.execute({
        type: 'local'
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able to get with establishmentId with type wrong', async() =>{
       const user = await inMemoryUserRepository.create({
              id: randomUUID(),
              name: 'john doe',
               email: 'johndoe@example.com',
               type: 'owner'
        })

          await inMemoryEstablishmentRepository.create({
                id: randomUUID(),
                name: "establishment examplo",
                ownerId: user.id,
                type: 'local'
    })
       const result = await sut.execute({
        type: 'shopping'
         })

    expect(result.isLeft()).toBe(true)
})
})