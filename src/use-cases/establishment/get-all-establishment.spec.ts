import { InMemoryUserRepository } from "@/repository/in-memory-repository/in-memory-user-repository"
import {describe, beforeEach, it, expect} from 'vitest'
import { InMemoryEstablishmentRepository } from "@/repository/in-memory-repository/in-memory-establishment-repository"
import { randomUUID } from "crypto"
import { GetAllEstablishmentUseCase } from "./get-all-establishment"


let inMemoryUserRepository: InMemoryUserRepository
let inMemoryEstablishmentRepository: InMemoryEstablishmentRepository
let sut: GetAllEstablishmentUseCase
describe('Get all establishment', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryEstablishmentRepository = new InMemoryEstablishmentRepository()
    sut = new GetAllEstablishmentUseCase(inMemoryEstablishmentRepository)
})

it('Should be able get all establishments ', async() =>{

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
    const result = await sut.execute({})

    expect(result.isRight()).toBe(true)
})

it('Should  be able to get  establishmentId ', async() =>{
      const user1 = await inMemoryUserRepository.create({
              id: randomUUID(),
              name: 'john doe',
               email: 'johndoe@example.com',
               type: 'owner'
    })

      const user2 = await inMemoryUserRepository.create({
              id: randomUUID(),
              name: 'john doe 2',
               email: 'johndoe@gmail.com',
               type: 'owner'
    })


    const establishment1 = await inMemoryEstablishmentRepository.create({
                id: randomUUID(),
                name: "establishment examplo",
                ownerId: user1.id,
                type: 'local'
    })

      const establishment2 = await inMemoryEstablishmentRepository.create({
                id: randomUUID(),
                name: "establishment examplo 2",
                ownerId: user2.id,
                type: 'local'
    })
    const result = await sut.execute({})

    expect(result.isRight()).toBe(true)

     if (result.isRight()) {
        expect(result.value.establishment).toEqual([establishment1, establishment2]);
    }
})
})