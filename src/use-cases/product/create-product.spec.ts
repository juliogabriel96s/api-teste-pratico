import { InMemoryUserRepository } from "@/repository/in-memory-repository/in-memory-user-repository"
import {describe, beforeEach, it, expect} from 'vitest'
import { InMemoryEstablishmentRepository } from "@/repository/in-memory-repository/in-memory-establishment-repository"
import { randomUUID } from "crypto"
import { InMemoryProductRepository } from "@/repository/in-memory-repository/in-memory-product-repository"
import { CreateProductUseCase } from "./create-product"


let inMemoryUserRepository: InMemoryUserRepository
let inMemoryEstablishmentRepository: InMemoryEstablishmentRepository
let inMemoryProductRepository: InMemoryProductRepository
let sut: CreateProductUseCase

describe('Register Product', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryEstablishmentRepository = new InMemoryEstablishmentRepository()
    inMemoryProductRepository = new InMemoryProductRepository()

    sut = new CreateProductUseCase(
        inMemoryEstablishmentRepository,
        inMemoryProductRepository
    )
})

it('Should be able create a product', async() =>{

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
        name: 'product examplo',
        price: 10,
        establishmentId: estabilishment.id
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able to create  a product with establishment id wrong', async() =>{
       const user = await inMemoryUserRepository.create({
              id: randomUUID(),
              name: 'john doe',
               email: 'johndoe@example.com',
               type: 'owner'
        })
       const result = await sut.execute({
        name: "establishment examplo",
        price: 10,
        establishmentId: 'id_wrong'
         })

    expect(result.isLeft()).toBe(true)
})
})