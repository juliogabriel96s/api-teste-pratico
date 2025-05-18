import { InMemoryUserRepository } from "@/repository/in-memory-repository/in-memory-user-repository"
import {describe, beforeEach, it, expect} from 'vitest'
import { InMemoryEstablishmentRepository } from "@/repository/in-memory-repository/in-memory-establishment-repository"
import { randomUUID } from "crypto"
import { GetEstablishmentUseCase } from "./get-establishment"
import { EditEstablishmentUseCase } from "./edit-establishment"


let inMemoryUserRepository: InMemoryUserRepository
let inMemoryEstablishmentRepository: InMemoryEstablishmentRepository
let sut: EditEstablishmentUseCase

describe('Edit establishment', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryEstablishmentRepository = new InMemoryEstablishmentRepository()
    sut = new EditEstablishmentUseCase(inMemoryEstablishmentRepository)
})

it('Should be able edit a establishment with id', async() =>{

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
        name: 'establishment edit',
        type: 'shopping'
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able to edit with establishmentId wrong', async() =>{
       const user = await inMemoryUserRepository.create({
              id: randomUUID(),
              name: 'john doe',
               email: 'johndoe@example.com',
               type: 'owner'
        })
       const result = await sut.execute({
        establishmentId:'id_wrong',
        name: 'establishment edit',
        type: 'shopping'
         })

    expect(result.isLeft()).toBe(true)
})
})