import { InMemoryUserRepository } from "@/repository/in-memory-repository/in-memory-user-repository"
import {describe, beforeEach, it, expect} from 'vitest'
import { InMemoryEstablishmentRepository } from "@/repository/in-memory-repository/in-memory-establishment-repository"
import { randomUUID } from "crypto"
import { InMemoryProductRepository } from "@/repository/in-memory-repository/in-memory-product-repository"
import { GetProductUseCase } from "./get-product"


let inMemoryUserRepository: InMemoryUserRepository
let inMemoryEstablishmentRepository: InMemoryEstablishmentRepository
let inMemoryProductRepository: InMemoryProductRepository
let sut: GetProductUseCase

describe('Get Product', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryEstablishmentRepository = new InMemoryEstablishmentRepository()
    inMemoryProductRepository = new InMemoryProductRepository()

    sut = new GetProductUseCase(inMemoryProductRepository)
})

it('Should be able get a product', async() =>{

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
    const result = await sut.execute({
       productId: product.id
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able to get  a product with id wrong', async() =>{
     
       const result = await sut.execute({
            productId: "id-wrong"
         })

    expect(result.isLeft()).toBe(true)
})
})