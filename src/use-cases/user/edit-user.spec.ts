import { InMemoryUserRepository } from "@/repository/in-memory-repository/in-memory-user-repository"
import {describe, beforeEach, it, expect} from 'vitest'
import { EditUserUseCase } from "./edit-user"


let inMemoryUserRepository: InMemoryUserRepository
let sut: EditUserUseCase

describe('Edit user', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new EditUserUseCase(inMemoryUserRepository)
})

it('Should be able edit a user', async() =>{

   const user =  await inMemoryUserRepository.create({
        id: '1',
        name: 'john doe',
        email: 'johndoe@example.com',
        type: 'customer'
    })

    const result = await sut.execute({
       userId: user.id,
       name: 'julio Gabriel',
       email: "juliogabriel55@hotmail.com"
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able to edit with id wrong', async() =>{
     await inMemoryUserRepository.create({
        id: '1',
        name: 'john doe',
        email: 'johndoe@example.com',
        type: 'customer'
    })

    const result = await sut.execute({
        userId: 'id-wrong',
        name: 'john doe',
        email: 'johndoe@example.com',
    })

    expect(result.isLeft()).toBe(true)
})
})