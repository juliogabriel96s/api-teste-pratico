import { InMemoryUserRepository } from "@/repository/in-memory-repository/in-memory-user-repository"
import {describe, beforeEach, it, expect} from 'vitest'
import { InMemoryEstablishmentRepository } from "@/repository/in-memory-repository/in-memory-establishment-repository"
import { randomUUID } from "crypto"
import { DeleteEstablishmentUseCase } from "./delete-establishment"


let inMemoryUserRepository: InMemoryUserRepository
let inMemoryEstablishmentRepository: InMemoryEstablishmentRepository
let sut: DeleteEstablishmentUseCase

describe('Delete establishment', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryEstablishmentRepository = new InMemoryEstablishmentRepository()
    sut = new DeleteEstablishmentUseCase(inMemoryEstablishmentRepository)
})

it('Should be able delete a establishment with id', async() =>{

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
        establishmentId: establishment.id,
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able to delete with establishmentId wrong', async() =>{
       const result = await sut.execute({
        establishmentId:'id_wrong',
         })

    expect(result.isLeft()).toBe(true)
})
})