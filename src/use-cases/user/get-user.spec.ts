import { InMemoryUserRepository } from "@/repository/in-memory-repository/in-memory-user-repository"
import {describe, beforeEach, it, expect} from 'vitest'
import { GetUserUseCase } from "./get-user"


let inMemoryUserRepository: InMemoryUserRepository
let sut: GetUserUseCase

describe('Get user', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GetUserUseCase(inMemoryUserRepository)
})

it('Should be able get a user with id', async() =>{

   const user =  await inMemoryUserRepository.create({
        id: '1',
        name: 'john doe',
        email: 'johndoe@example.com',
        type: 'customer'
    })

    const result = await sut.execute({
       userId: user.id 
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able to get with id wrong', async() =>{
     await inMemoryUserRepository.create({
        id: '1',
        name: 'john doe',
        email: 'johndoe@example.com',
        type: 'customer'
    })

    const result = await sut.execute({
        userId: 'id-wrong'
    })

    expect(result.isLeft()).toBe(true)
})
})