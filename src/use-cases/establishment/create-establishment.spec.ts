import { InMemoryUserRepository } from "@/repository/in-memory-repository/in-memory-user-repository"
import {describe, beforeEach, it, expect} from 'vitest'
import { InMemoryEstablishmentRepository } from "@/repository/in-memory-repository/in-memory-establishment-repository"
import { CreateEstablishmentUseCase } from "./create-establishment"
import { randomUUID } from "crypto"


let inMemoryUserRepository: InMemoryUserRepository
let inMemoryEstablishmentRepository: InMemoryEstablishmentRepository
let sut: CreateEstablishmentUseCase

describe('Register establishment', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryEstablishmentRepository = new InMemoryEstablishmentRepository()
    sut = new CreateEstablishmentUseCase(
        inMemoryUserRepository,
        inMemoryEstablishmentRepository
    )
})

it('Should be able create a establishment', async() =>{

    const user = await inMemoryUserRepository.create({
              id: randomUUID(),
              name: 'john doe',
               email: 'johndoe@example.com',
               type: 'owner'
    })
    const result = await sut.execute({
        name: "establishment examplo",
        ownerId: user.id,
        type: 'local'
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able to register with owner id wrong', async() =>{
       const user = await inMemoryUserRepository.create({
              id: randomUUID(),
              name: 'john doe',
               email: 'johndoe@example.com',
               type: 'owner'
        })
       const result = await sut.execute({
        name: "establishment examplo",
        ownerId:"id-wrong",
        type: 'local'
         })

    expect(result.isLeft()).toBe(true)
})
})