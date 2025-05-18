import { InMemoryUserRepository } from "@/repository/in-memory-repository/in-memory-user-repository"
import {describe, beforeEach, it, expect} from 'vitest'
import { InMemoryEstablishmentRepository } from "@/repository/in-memory-repository/in-memory-establishment-repository"
import { randomUUID } from "crypto"
import { InMemoryProductRepository } from "@/repository/in-memory-repository/in-memory-product-repository"
import { GetAllProductUseCase } from "./get-all-product"


let inMemoryUserRepository: InMemoryUserRepository
let inMemoryEstablishmentRepository: InMemoryEstablishmentRepository
let inMemoryProductRepository: InMemoryProductRepository
let sut: GetAllProductUseCase

describe('Get all Product', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryEstablishmentRepository = new InMemoryEstablishmentRepository()
    inMemoryProductRepository = new InMemoryProductRepository()

    sut = new GetAllProductUseCase(inMemoryProductRepository)
})

it('Should be able get all the products', async() =>{

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

    const product = await inMemoryProductRepository.create({
          id: randomUUID(),
          name: 'product examplo',
          price: 10,
          establishmentId: estabilishment.id
    })
    const result = await sut.execute({})

    expect(result.isRight()).toBe(true)
})

it('Should not be able to get all the products ', async() =>{


      const user1 = await inMemoryUserRepository.create({
              id: randomUUID(),
              name: 'john doe',
               email: 'johndoe@example.com',
               type: 'owner'
    })

    const estabilishment1 = await inMemoryEstablishmentRepository.create({
            id: randomUUID(),
            name: "establishment examplo",
            ownerId: user1.id,
            type: 'local'
    })

    const product1 = await inMemoryProductRepository.create({
          id: randomUUID(),
          name: 'product examplo',
          price: 10,
          establishmentId: estabilishment1.id
    })

    const user2 = await inMemoryUserRepository.create({
              id: randomUUID(),
              name: 'john doe 2',
               email: 'johndoe@hotmail.com',
               type: 'owner'
    })

    const estabilishment2 = await inMemoryEstablishmentRepository.create({
            id: randomUUID(),
            name: "establishment examplo 2",
            ownerId: user2.id,
            type: 'local'
    })

    const product2 = await inMemoryProductRepository.create({
          id: randomUUID(),
          name: 'product examplo 2',
          price: 10,
          establishmentId: estabilishment2.id
    })
     
       const result = await sut.execute({})

    expect(result.isRight()).toBe(true)
    
     if (result.isRight()) {
        expect(result.value.product).toEqual([product1, product2]);
    }
})
})