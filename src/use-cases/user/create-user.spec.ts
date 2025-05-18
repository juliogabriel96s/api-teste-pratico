import { InMemoryUserRepository } from "@/repository/in-memory-repository/in-memory-user-repository"
import { CreateUserUseCase } from "./create-user"
import {describe, beforeEach, it, expect} from 'vitest'


let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('Register user', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(inMemoryUserRepository)
})

it('Should be able create a user', async() =>{
    const result = await sut.execute({
        name: 'john doe',
        email: 'johndoe@example.com',
        type: 'customer'
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able to register with same email twice', async() =>{
    const email = 'johndoe@example.com'

    await sut.execute({
        name: 'john doe',
        email,
        type: 'customer'
    })

    const result = await sut.execute({
        name: 'john doe',
        email,
        type: 'customer'
    })

    expect(result.isLeft()).toBe(true)
})
})